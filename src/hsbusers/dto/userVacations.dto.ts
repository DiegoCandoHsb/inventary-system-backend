import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class Vacation {
  @IsDate()
  @IsOptional()
  startVacationDay: Date;

  @IsDate()
  @IsOptional()
  endVacationDay: Date;

  @IsNumber()
  @IsOptional()
  days: Date;
}

export class Permissions {
  @IsDate()
  @IsOptional()
  startPermisionDay: Date;
  // endPermisionDay: Date; obs
  @IsNumber()
  @IsOptional()
  days: number;

  @IsString()
  @IsOptional()
  Observation: string;
}

export const defaultDatesData = Object.freeze({
  admissionDate: '',
  remainingDays: 0,
  vacations: [],
  addedDays: 0,
  takenDays: 0,
  permissions: [],
});
