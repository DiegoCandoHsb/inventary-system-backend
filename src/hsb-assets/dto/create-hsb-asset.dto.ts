import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AssetActive } from '../constants/assetActive';
import { Type } from 'class-transformer';

export class assetDetailsDto {
  @IsString()
  @IsNotEmpty()
  assetType: string;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsString()
  @IsNotEmpty()
  supplier: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  depreciationTime: number;

  @IsNumber()
  @IsNotEmpty()
  residualValue: number;

  @IsNumber()
  @IsNotEmpty()
  anualDepreciation: number;

  @IsNumber()
  @IsNotEmpty()
  monthlyDepreciation: number;

  @IsNumber()
  @IsNotEmpty()
  valueBooks: number;

  @IsString()
  @IsNotEmpty()
  observation: string;

  @IsNumber()
  @IsNotEmpty()
  insured: number;

  @IsString()
  @IsEnum(AssetActive)
  @IsNotEmpty()
  active: AssetActive;
}

export class CreateHsbAssetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => assetDetailsDto)
  @ValidateNested()
  @IsObject()
  details: assetDetailsDto;

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: Date;
}
