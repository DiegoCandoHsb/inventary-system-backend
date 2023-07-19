import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from './entities/catalog.entity';
import { Repository } from 'typeorm';
import { HandleException } from 'src/common/handleExeption';

@Injectable()
export class CatalogService {
  private readonly exeptionLogger = new HandleException();
  constructor(
    @InjectRepository(Catalog)
    private readonly catalogRepository: Repository<Catalog>,
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    const catalog = this.catalogRepository.create(createCatalogDto);
    try {
      await this.catalogRepository.save(catalog);
      return catalog;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async findAll() {
    const catalogs = await this.catalogRepository.find();
    return catalogs;
  }

  async findOne(id: number) {
    const catalog = await this.catalogRepository.findOneBy({ id });
    if (!catalog) throw new NotFoundException('catalog did not found');
    return catalog;
  }

  async findOneByName(catalogName?: string) {
    const catalog = await this.catalogRepository.findOneBy({ catalogName });
    if (!catalog) {
      // const newCatalog = this.catalogRepository.create({ catalogName });

      const newCatalog = await this.create({ catalogName });

      return newCatalog;
    }

    return catalog;
  }

  async update(id: number, updateCatalogDto: UpdateCatalogDto) {
    const catalog = await this.catalogRepository.preload({
      id,
      ...updateCatalogDto,
    });
    if (!catalog) throw new NotFoundException('catalog did not found');

    try {
      await this.catalogRepository.save(catalog);
      return catalog;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }

    return catalog;
  }

  async remove(id: number) {
    const catalog = await this.findOne(id);
    try {
      await this.catalogRepository.remove(catalog);
      return true;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }
}
