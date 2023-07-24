import { PartialType } from '@nestjs/mapped-types';
import { CreateHsbAssetDto } from './create-hsb-asset.dto';

export class UpdateHsbAssetDto extends PartialType(CreateHsbAssetDto) {}
