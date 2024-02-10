import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HsbAssetsService } from './hsb-assets.service';
import { CreateHsbAssetDto2 } from './dto/create-hsb-asset.dto';
import { UpdateHsbAssetDto2 } from './dto/update-hsb-asset.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/common/decorators/is-public/is-public.decorator';
import { AssetType } from './constants/assetType';

@UseGuards(JwtAuthGuard)
@Controller('assets')
export class HsbAssetsController {
  constructor(private readonly hsbAssetsService: HsbAssetsService) {}

  // @Post()
  // create(@Body() createHsbAssetDto: CreateHsbAssetDto) {
  //   return this.hsbAssetsService.create(createHsbAssetDto);
  // }
  @IsPublic()
  @Post()
  create(@Body() createHsbAssetDto: CreateHsbAssetDto2) {
    return this.hsbAssetsService.create2(createHsbAssetDto);
  }

  @Get()
  findAll() {
    return this.hsbAssetsService.findAll();
  }

  @IsPublic()
  @Get(':type')
  findByType(@Param('type') type: AssetType) {
    return this.hsbAssetsService.findEspecificAssets(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hsbAssetsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateHsbAssetDto: UpdateHsbAssetDto,
  // ) {
  //   return this.hsbAssetsService.update(+id, updateHsbAssetDto);
  // }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHsbAssetDto: UpdateHsbAssetDto2,
  ) {
    return this.hsbAssetsService.update2(+id, updateHsbAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hsbAssetsService.remove(+id);
  }

  @IsPublic()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.hsbAssetsService.uploadFile(file);
  }

  @IsPublic()
  @Post('download')
  downdloadFile(
    @Body() paylaod: { assets: CreateHsbAssetDto2[]; fileName: string },
  ) {
    return this.hsbAssetsService.downloadAssetXlsx(
      paylaod.assets,
      paylaod.fileName,
    );
  }
}
