import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HsbAssetsService } from './hsb-assets.service';
import { CreateHsbAssetDto } from './dto/create-hsb-asset.dto';
import { UpdateHsbAssetDto } from './dto/update-hsb-asset.dto';

@Controller('assets')
export class HsbAssetsController {
  constructor(private readonly hsbAssetsService: HsbAssetsService) {}

  @Post()
  create(@Body() createHsbAssetDto: CreateHsbAssetDto) {
    return this.hsbAssetsService.create(createHsbAssetDto);
  }

  @Get()
  findAll() {
    return this.hsbAssetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hsbAssetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHsbAssetDto: UpdateHsbAssetDto,
  ) {
    return this.hsbAssetsService.update(+id, updateHsbAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hsbAssetsService.remove(+id);
  }
}
