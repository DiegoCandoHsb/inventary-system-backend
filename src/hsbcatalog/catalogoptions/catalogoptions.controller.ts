import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CatalogoptionsService } from './catalogoptions.service';
import { CreateCatalogoptionDto } from './dto/create-catalogoption.dto';
import { UpdateCatalogoptionDto } from './dto/update-catalogoption.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('catalogoptions')
export class CatalogoptionsController {
  constructor(private readonly catalogoptionsService: CatalogoptionsService) {}

  @Post()
  create(@Body() createCatalogoptionDto: CreateCatalogoptionDto) {
    return this.catalogoptionsService.create(createCatalogoptionDto);
  }

  @Get()
  findAll() {
    return this.catalogoptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catalogoptionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatalogoptionDto: UpdateCatalogoptionDto,
  ) {
    return this.catalogoptionsService.update(id, updateCatalogoptionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catalogoptionsService.remove(id);
  }
}
