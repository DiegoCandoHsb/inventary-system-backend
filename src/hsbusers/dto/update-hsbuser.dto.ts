import { PartialType } from '@nestjs/mapped-types';
import { HsbuserDto } from './create-hsbuser.dto';

export class UpdateHsbuserDto extends PartialType(HsbuserDto) {}
