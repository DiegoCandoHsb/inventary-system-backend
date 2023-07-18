import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsPositive,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsBoolean,
  IsDate,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNumberString,
  IsObject,
  Matches,
} from 'class-validator';

export class userDetails {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ]{5,80}$/, {
    message: 'Lastname must be more than 5 characters',
  })
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Matches(/^\d{10}$/, {
    message:
      'Name must be more than 5 charancters and don`t contain special symbols',
  })
  phone: number;

  @IsDate()
  @IsOptional()
  admissionDate?: Date;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  remainingDays?: number;

  @IsString()
  @IsArray({ each: true })
  @IsOptional()
  vacations?: any[];

  @IsPositive()
  @IsNumber()
  @IsOptional()
  addedDays?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  takenDays?: number;

  @IsString()
  @IsArray({ each: true })
  @IsOptional()
  permissions?: any[];
}

export class HsbuserDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Matches(/^\d{10}$/, { message: 'ID must be with 10 characters' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ]{5,80}$/, {
    message:
      'Name must be more than 5 charancters and don`t contain special symbols',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @Type(() => userDetails)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  details?: userDetails;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
