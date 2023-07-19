import { Catalog } from 'src/hsbcatalog/catalog/entities/catalog.entity';
import {
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
  })
  catalogDetail: string;

  @ManyToOne(() => Catalog, (catalog) => catalog.catalogOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  catalog: Catalog;
}
