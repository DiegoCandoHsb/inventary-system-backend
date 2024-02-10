import { Catalog } from 'src/hsbcatalog/catalog/entities/catalog.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Catalogoption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  catalogDetail: string;

  @ManyToOne(() => Catalog, (catalog) => catalog.catalogOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  catalog: Catalog;

  @BeforeInsert()
  @BeforeUpdate()
  formatName() {
    this.catalogDetail = this.catalogDetail.toUpperCase();
  }
}
