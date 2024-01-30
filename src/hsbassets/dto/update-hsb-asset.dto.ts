import { PartialType } from '@nestjs/mapped-types';
import { CreateHsbAssetDto, CreateHsbAssetDto2 } from './create-hsb-asset.dto';

export class UpdateHsbAssetDto extends PartialType(CreateHsbAssetDto) {}
export class UpdateHsbAssetDto2 extends PartialType(CreateHsbAssetDto2) {}
