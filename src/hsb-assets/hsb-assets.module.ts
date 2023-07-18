import { Module } from '@nestjs/common';
import { HsbAssetsService } from './hsb-assets.service';
import { HsbAssetsController } from './hsb-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HsbAsset } from './entities/hsb-asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HsbAsset])],
  controllers: [HsbAssetsController],
  providers: [HsbAssetsService],
  exports: [HsbAssetsService],
})
export class HsbAssetsModule {}
