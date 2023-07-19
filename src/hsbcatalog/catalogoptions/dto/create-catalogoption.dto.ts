import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatalogoptionDto {
  @IsString()
  @IsNotEmpty()
  catalogDetail: string;

  @IsString()
  @IsNotEmpty()
  catalog: string;
}
