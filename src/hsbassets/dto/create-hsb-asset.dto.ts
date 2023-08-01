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
import { AssetType } from '../constants/assetType';

export class assetDetailsDto {
  @IsString()
  @IsEnum(AssetType)
  @IsNotEmpty()
  assetType: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

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

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsNumber()
  @IsNotEmpty()
  residualValue: number;

  @IsNumber()
  @IsNotEmpty()
  annualDepreciation: number;

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
