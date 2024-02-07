import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssetType } from '../constants/assetType';
import { IsNotEmpty, Validate } from 'class-validator';
import { Inject } from '@nestjs/common';
import { HsbusersService } from 'src/hsbusers/hsbusers.service';

class assetDetails {
  code: string;

  quantity: number;

  brand: string;

  model: string;

  color: string;

  serialNumber: string;

  invoice: string;

  provider: string;

  unitValue: number;

  totalValue: number;

  depreciationTime: number;

  residualValue: number;

  annualDepreciation: number;

  monthlyDepreciation: number;

  valueBooks: number;

  insured: number;

  state: string;

  active: boolean;

  responsible: string;

  ubication: string; //

  type: AssetType;

  observation: string;

  // EE fields

  inches: string;

  processor: string;

  kitValue: number;

  speed: string;

  ram: string;

  hdd: string;
}

@Entity({ name: 'hsbasset' })
export class HsbAsset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  itemName: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  details: assetDetails;

  @Column({
    type: 'date',
    nullable: false,
  })
  purchaseDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  changeName() {
    this.itemName = this.itemName && formatName(this.itemName);
  }
}

function formatName(name: string) {
  return name.charAt(0).toLocaleUpperCase().concat(name.slice(1, name.length));
}
