import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AssetType } from '../constants/assetType';

export class assetDetailsDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsOptional()
  invoice: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsNumber()
  @IsNotEmpty()
  unitValue: number;

  @IsNumber()
  @IsNotEmpty()
  totalValue: number;

  @IsNumber()
  @IsNotEmpty()
  depreciationTime: number;

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

  @IsNumber()
  @IsOptional()
  insured: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  ubication: string;

  @IsEnum(AssetType)
  @IsNotEmpty()
  @IsString()
  type: AssetType;

  @IsString()
  @IsOptional()
  observation: string;

  // EE fields
  @IsString()
  @IsOptional()
  inches: string;

  @IsString()
  @IsOptional()
  processor: string;

  @IsNumber()
  @IsOptional()
  kitValue: number;

  @IsString()
  @IsOptional()
  speed: string;

  @IsString()
  @IsOptional()
  ram: string;

  @IsString()
  @IsOptional()
  hdd: string;
}

export class CreateHsbAssetDto {
  [key: string]: any;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @Type(() => assetDetailsDto)
  @ValidateNested()
  @IsObject()
  details: assetDetailsDto;

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: Date;
}

// real
export class CreateHsbAssetDto2 {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: Date;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsOptional()
  invoice: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsNumber()
  @IsNotEmpty()
  unitValue: number;

  @IsNumber()
  @IsNotEmpty()
  totalValue: number;

  @IsNumber()
  @IsNotEmpty()
  depreciationTime: number;

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

  @IsNumber()
  @IsOptional()
  insured: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  ubication: string;

  @IsEnum(AssetType)
  @IsNotEmpty()
  @IsString()
  type: AssetType;

  @IsString()
  @IsOptional()
  observation: string;

  // EE fields
  @IsString()
  @IsOptional()
  inches: string;

  @IsString()
  @IsOptional()
  processor: string;

  @IsNumber()
  @IsOptional()
  kitValue: number;

  @IsString()
  @IsOptional()
  speed: string;

  @IsString()
  @IsOptional()
  ram: string;

  @IsString()
  @IsOptional()
  hdd: string;
}
