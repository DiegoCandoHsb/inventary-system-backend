import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogoptionDto } from './dto/create-catalogoption.dto';
import { UpdateCatalogoptionDto } from './dto/update-catalogoption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalogoption } from './entities/catalogoption.entity';
import { Repository } from 'typeorm';
import { HandleException } from 'src/common/handleExeption';
import { CatalogService } from '../catalog/catalog.service';

@Injectable()
export class CatalogoptionsService {
  private readonly exeptionLogger = new HandleException();
  constructor(
    @InjectRepository(Catalogoption)
    private readonly catalogOptionRepository: Repository<Catalogoption>,

    private readonly catalogService: CatalogService,
  ) {}
  async create({ catalog, catalogDetail }: CreateCatalogoptionDto) {
    const catalogOption = this.catalogOptionRepository.create({
      catalogDetail,
      catalog: await this.catalogService.findOneByName(catalog && catalog),
    });
    try {
      await this.catalogOptionRepository.save(catalogOption);
      return catalogOption;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async findAll() {
    const options = await this.catalogOptionRepository.find();

    try {
      return options;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async findOne(id: number) {
    const option = await this.catalogOptionRepository.findOneBy({ id });
    if (!option)
      throw new NotFoundException(`Option with id ${id} did not found`);

    return option;
  }

  async update(id: number, { catalog, catalogDetail }: UpdateCatalogoptionDto) {
    const option = await this.catalogOptionRepository.preload({
      id,
      catalogDetail,
      catalog:
        catalog && (await this.catalogService.findOneByName(catalog, true)),
    });

    try {
      await this.catalogOptionRepository.save(option);
      return option;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async remove(id: number) {
    const option = await this.findOne(id);

    try {
      await this.catalogOptionRepository.remove(option);
      return true;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }
}
