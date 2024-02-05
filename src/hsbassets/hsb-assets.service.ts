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
import {
  UpdateHsbAssetDto,
  UpdateHsbAssetDto2,
} from './dto/update-hsb-asset.dto';
import { HandleException } from 'src/common/handleExeption';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HsbAsset } from './entities/hsb-asset.entity';
import { CatalogoptionsService } from 'src/hsbcatalog/catalogoptions/catalogoptions.service';
import { AssetType } from './constants/assetType';

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
  ) {}

  // async create({ details, ...assetData }: CreateHsbAssetDto) {
  //   const { brand, ...detailsData } = details;

  //   const asset = this.assetRepository.create({
  //     ...assetData,
  //     details: {
  //       ...detailsData,
  //       brand: await this.catalogOptionService.findOneByName(
  //         brand,
  //         this.configAssets.assetBrandCatalogName,
  //       ),
  //     },
  //   });

  //   try {
  //     await this.assetRepository.save(asset);
  //     return asset;
  //   } catch (error) {
  //     this.exeptionLogger.logException(error);
  //   }
  // }

  async create2(createHsbAssetPlainDto: CreateHsbAssetDto2) {
    const { details, ...data } = this.formatAssetPlainData(
      createHsbAssetPlainDto,
    );

    const asset = this.assetRepository.create({
      ...data,
      details: {
        ...details,
        brand: await this.catalogOptionService.findOneByName(
          details.brand,
          this.configAssets.assetBrandCatalogName,
        ),
      },
    });

    try {
      await this.assetRepository.save(asset);
      return asset;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async findAll() {
    const assets = await this.assetRepository.find();
    return assets;
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
    const formatedData = this.formatAssetPlainData(updateHsbAssetDto);

    const asset = await this.assetRepository.preload({
      id,
      ...formatedData,
    });

    if (!asset) throw new NotFoundException(`asset whith id ${id} not found`);

    try {
      await this.assetRepository.save(asset);
      return asset;
    } catch (error) {
      this.exeptionLogger.logException(error);
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
    }
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new UnprocessableEntityException('File error');

    const workbook = XLSX.read(file.buffer, {
      type: 'buffer',
      cellDates: true,
      // raw: true,
    });

    const woorksheetData: CreateHsbAssetDto2[] = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
    );

    const xd = woorksheetData.map((assetData) => {
      return this.formatAssetPlainData(assetData);
    });

    await this.assetRepository.save(xd);

    return;
  }
}
