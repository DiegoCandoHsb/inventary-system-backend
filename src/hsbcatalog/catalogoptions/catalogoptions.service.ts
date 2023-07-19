import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all catalogoptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoption`;
  }

  update(id: number, updateCatalogoptionDto: UpdateCatalogoptionDto) {
    return `This action updates a #${id} catalogoption`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoption`;
  }
}
