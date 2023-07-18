import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHsbAssetDto } from './dto/create-hsb-asset.dto';
import { UpdateHsbAssetDto } from './dto/update-hsb-asset.dto';
import { HandleException } from 'src/common/handleExeption';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HsbAsset } from './entities/hsb-asset.entity';

@Injectable()
export class HsbAssetsService {
  private readonly exeptionLogger = new HandleException();

  constructor(
    @InjectRepository(HsbAsset)
    private readonly assetRepository: Repository<HsbAsset>,
  ) {}

  async create(createHsbAssetDto: CreateHsbAssetDto) {
    const asset = this.assetRepository.create(createHsbAssetDto);
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
