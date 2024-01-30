import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssetType } from '../constants/assetType';

@Entity()
class assetDetails {
  @Column({
    type: 'text',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  brand: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  model: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  color: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  serialNumber: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  invoice: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  provider: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  unitValue: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  totalValue: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  depreciationTime: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  residualValue: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  annualDepreciation: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  monthlyDepreciation: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  valueBooks: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  insured: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  state: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  active: boolean;

  @Column({
    type: 'text',
    nullable: false,
  })
  responsible: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  ubication: string; //

  @Column({
    enum: AssetType,
    nullable: false,
  })
  type: AssetType;

  @Column({
    type: 'text',
    nullable: true,
  })
  observation: string;

  // EE fields
  @Column({
    type: 'text',
    nullable: true,
  })
  inches: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  processor: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  kitValue: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  speed: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  ram: string;

  @Column({
    type: 'text',
    nullable: true,
  })
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
