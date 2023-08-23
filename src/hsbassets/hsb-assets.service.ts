import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHsbAssetDto } from './dto/create-hsb-asset.dto';
import { UpdateHsbAssetDto } from './dto/update-hsb-asset.dto';
import { HandleException } from 'src/common/handleExeption';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HsbAsset } from './entities/hsb-asset.entity';
import { CatalogoptionsService } from 'src/hsbcatalog/catalogoptions/catalogoptions.service';

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

  async create({ details, ...assetData }: CreateHsbAssetDto) {
    const { brand, ...detailsData } = details;

    const asset = this.assetRepository.create({
      ...assetData,
      details: {
        ...detailsData,
        brand: await this.catalogOptionService.findOneByName(
          brand,
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
    const xd = assets.map(asset => {
      return {
        ...asset,
        name: asset.name.substring(0, 10)
      }
    })
    return xd;
  }

  async findOne(id: number) {
    const asset = await this.assetRepository.findOneBy({ id });
    if (!asset) throw new NotFoundException(`user with id: ${id}, not found`);
    return asset;
  }

  async update(id: number, updateHsbAssetDto: UpdateHsbAssetDto) {
    const asset = await this.assetRepository.preload({
      id,
      ...updateHsbAssetDto,
    });

    if (!asset) throw new NotFoundException(`asset whith id ${id} not found`);

    try {
      await this.assetRepository.save(asset);
      return asset;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
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
}
