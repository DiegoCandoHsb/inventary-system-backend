import { Type } from 'class-transformer';
import {
  IsPositive,
  IsString,
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
  IsIn,
  IsDateString,
} from 'class-validator';
import { Permissions, Vacation } from './userVacations.dto';

export class userDetails {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ]{2,80}$/, {
    message: 'Lastname must be more than 2 characters',
  })
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ]{2,80}$/, {
    message: 'Lastname must be more than 2 characters',
  })
  secondname: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ]{2,80}$/, {
    message: 'Lastname must be more than 2 characters',
  })
  secondlastname: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Matches(/^\d{10}$/, {
    message: 'Phone must be with 10 characters and not contain special symbols',
  })
  phone: string;

  @IsString()
  @IsIn(['Yes', 'No'])
  @IsNotEmpty()
  payroll: 'Yes' | 'No';

  @IsDateString()
  @IsOptional()
  admissionDate?: Date;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  remainingDays?: number;

  @IsArray()
  @IsOptional()
  vacations?: Vacation[];

  @IsPositive()
  @IsNumber()
  @IsOptional()
  addedDays?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  takenDays?: number;

  @IsArray()
  @IsOptional()
  permissions?: Permissions[];
}

export class HsbuserDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Matches(/^\d{10}$/, { message: 'ID must be with 10 characters' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ]{2,80}$/, {
    message:
      'Name must be more than 2 charancters and don`t contain special symbols',
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
