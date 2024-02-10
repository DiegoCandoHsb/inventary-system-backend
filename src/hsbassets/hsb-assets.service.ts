import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import * as XLSX from 'xlsx';

import {
  CreateHsbAssetDto,
  CreateHsbAssetDto2,
} from './dto/create-hsb-asset.dto';
import { UpdateHsbAssetDto2 } from './dto/update-hsb-asset.dto';
import { HandleException } from 'src/common/handleExeption';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HsbAsset } from './entities/hsb-asset.entity';
import { CatalogoptionsService } from 'src/hsbcatalog/catalogoptions/catalogoptions.service';
import { AssetType } from './constants/assetType';
import { HsbusersService } from 'src/hsbusers/hsbusers.service';

@Injectable()
export class HsbAssetsService {
  private readonly exeptionLogger = new HandleException();

  private readonly configAssets = {
    assetBrandCatalogName: 'Brands',
  };

  constructor(
    @InjectRepository(HsbAsset)
    private readonly assetRepository: Repository<HsbAsset>,

    private readonly catalogOptionService: CatalogoptionsService,

    private readonly userService: HsbusersService,
  ) {}

  async create2(
    createHsbAssetPlainDto: CreateHsbAssetDto2 | CreateHsbAssetDto2[],
    assetsArr?: CreateHsbAssetDto[],
  ) {
    const assets = assetsArr ? assetsArr : await this.findAll();

    try {
      if (!Array.isArray(createHsbAssetPlainDto)) {
        createHsbAssetPlainDto = [createHsbAssetPlainDto];
      }

      const brandsList: Set<string> = new Set();

      const promiseAssetsArr = await Promise.all(
        createHsbAssetPlainDto.map(async (createHsbAssetPlainDto2) => {
          const brand = createHsbAssetPlainDto2.brand.toUpperCase();

          brandsList.add(createHsbAssetPlainDto2.brand);

          const { code } = createHsbAssetPlainDto2;

          const assetAlreadyExist = assets.find(
            (asset) => asset.details.code === code,
          );

          if (assetAlreadyExist)
            return await this.update2(
              assetAlreadyExist.id,
              createHsbAssetPlainDto2,
            );

          const { details, ...data } = this.formatAssetPlainData(
            createHsbAssetPlainDto2,
          );

          const asset = this.assetRepository.create({
            ...data,
            details: {
              ...details,
              brand,
            },
          });
          return asset;
        }),
      );

      brandsList.forEach(
        async (brandName) =>
          await this.catalogOptionService.findOneByName(
            brandName,
            this.configAssets.assetBrandCatalogName,
          ),
      );

      await this.assetRepository.save(promiseAssetsArr);
      return 'Asset created';
    } catch (error) {
      this.exeptionLogger.logException(error);
      return;
    }
  }

  async findAll() {
    const assets = await this.assetRepository.find();
    return assets;
  }

  async findAllAssetsWithPlainData() {
    const assets = await this.findAll();

    const plainAssets = assets.map(({ details, ...data }) => {
      return {
        ...data,
        ...details,
      };
    });

    return plainAssets;
  }

  async findEspecificAssets(type: AssetType) {
    const specific = await this.assetRepository
      .createQueryBuilder('hsbassets')
      .where("hsbassets.details->>'type' ILIKE :type", { type: `%${type}%` })
      .getMany();

    return specific;
  }

  async findOne(id: number) {
    const asset = await this.assetRepository.findOneBy({ id });
    if (!asset) throw new NotFoundException(`user with id: ${id}, not found`);
    return asset;
  }

  // async update(id: number, updateHsbAssetDto: UpdateHsbAssetDto) {
  //   const asset = await this.assetRepository.preload({
  //     id,
  //     ...updateHsbAssetDto,
  //   });

  //   if (!asset) throw new NotFoundException(`asset whith id ${id} not found`);

  //   try {
  //     await this.assetRepository.save(asset);
  //     return asset;
  //   } catch (error) {
  //     this.exeptionLogger.logException(error);
  //   }
  // }
  async update2(id: number, updateHsbAssetDto: UpdateHsbAssetDto2) {
    const { details, ...assetData } =
      this.formatAssetPlainData(updateHsbAssetDto);

    const asset = await this.assetRepository.preload({
      id,
      ...assetData,
      details: {
        ...details,
        brand: await this.catalogOptionService.findOneByName(
          details.brand,
          this.configAssets.assetBrandCatalogName,
        ),
      },
    });

    if (!asset) throw new NotFoundException(`asset whith id ${id} not found`);

    try {
      await this.assetRepository.save(asset);
      return asset;
    } catch (error) {
      this.exeptionLogger.logException(error);
      return;
    }
  }

  formatAssetPlainData(data: CreateHsbAssetDto2 | UpdateHsbAssetDto2) {
    const { itemName, purchaseDate, id, ...details } =
      data as CreateHsbAssetDto2 & UpdateHsbAssetDto2 & { id: number };

    const formatedData = {
      itemName,
      purchaseDate,
      details,
    };

    return formatedData;
  }

  async remove(id: number) {
    const asset = await this.findOne(id);
    if (!asset) throw new NotFoundException(`asset whith id ${id} not found`);
    try {
      await this.assetRepository.remove(asset);
      return true;
    } catch (error) {
      this.exeptionLogger.logException(error);
      return false;
    }
  }

  async removeByAssetCode(code: string) {
    const asset = await this.assetRepository
      .createQueryBuilder('hsbasset')
      .where("hsbasset.details->> 'code' ILIKE  :code", { code: `%${code}%` })
      .getMany();
    if (!asset)
      throw new NotFoundException(`Asset whith code ${code} not found`);
    try {
      await this.assetRepository.remove(asset);
      return true;
    } catch (error) {
      this.exeptionLogger.logException(error);
      return false;
    }
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new UnprocessableEntityException('File error');

    const assetsFromDb: CreateHsbAssetDto[] = await this.findAll();

    const users = await this.userService.findAll({});

    const workbook = XLSX.read(file.buffer, {
      type: 'buffer',
      cellDates: true,
    });

    const woorksheetData = [
      ...(XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
      ) as CreateHsbAssetDto2[]),
    ]
      .reverse()
      .filter((asset, index, assetsArr) => {
        if (
          index ===
          assetsArr.findIndex((assetItem) => assetItem.code === asset.code)
        )
          return true;
        return false;
      });

    const dataArr = woorksheetData.map((assetData) => {
      const data = assetData;

      const splitName = assetData.responsible
        .split(' ')
        .map((str) => str.toLowerCase());
      data.responsible =
        users.find(
          (user) =>
            user.name.toLowerCase() === splitName[0] &&
            user.details.secondname.toLowerCase() === splitName[1] &&
            user.details.lastname.toLowerCase() === splitName[2] &&
            user.details.secondlastname.toLowerCase() === splitName[3],
        )?.id ?? '';

      return data;
    });

    await this.create2(dataArr, assetsFromDb);

    return 'success';
  }

  async downloadAssetXlsx(assets: CreateHsbAssetDto2[], fileName: string) {
    if (!assets.length) return;

    const users = await this.userService.findAll({});

    assets.map(async (asset) => {
      asset.responsible = asset.responsible
        ? this.userService.getUserCompleteName(
            users.find((user) => user.id === asset.responsible),
          )
        : 'No user Found';

      return asset;
    });

    const worksheet = XLSX.utils.json_to_sheet(assets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    return workbook;
  }
}
