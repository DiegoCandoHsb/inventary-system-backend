import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoptionDto } from './create-catalogoption.dto';

export class UpdateCatalogoptionDto extends PartialType(CreateCatalogoptionDto) {}
