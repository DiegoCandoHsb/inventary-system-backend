import { Module } from '@nestjs/common';
import { CatalogoptionsService } from './catalogoptions.service';
import { CatalogoptionsController } from './catalogoptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalogoption } from './entities/catalogoption.entity';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [TypeOrmModule.forFeature([Catalogoption]), CatalogModule],
  controllers: [CatalogoptionsController],
  providers: [CatalogoptionsService],
  exports: [CatalogoptionsService],
})
export class CatalogoptionsModule {}
