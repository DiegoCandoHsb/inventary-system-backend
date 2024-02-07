import { Module } from '@nestjs/common';
import { HsbAssetsService } from './hsb-assets.service';
import { HsbAssetsController } from './hsb-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HsbAsset } from './entities/hsb-asset.entity';
import { CatalogoptionsModule } from 'src/hsbcatalog/catalogoptions/catalogoptions.module';
import { JwtModule } from '@nestjs/jwt';
import { HsbusersModule } from 'src/hsbusers/hsbusers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HsbAsset]),
    CatalogoptionsModule,
    JwtModule.register({}),
    HsbusersModule,
  ],
  controllers: [HsbAssetsController],
  providers: [HsbAssetsService],
  exports: [HsbAssetsService],
})
export class HsbAssetsModule {}
