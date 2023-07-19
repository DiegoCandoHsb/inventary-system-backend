import { Catalogoption } from 'src/hsbcatalog/catalogoptions/entities/catalogoption.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catalogName: string;

  @OneToMany(() => Catalogoption, (option) => option.catalog, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  catalogOptions: Catalogoption[];
}
