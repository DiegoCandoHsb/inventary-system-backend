import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { CatalogoptionsModule } from './catalogoptions/catalogoptions.module';

@Module({
  imports: [CatalogModule, CatalogoptionsModule],
  controllers: [],
  providers: [],
})
export class HsbcatalogModule {}
