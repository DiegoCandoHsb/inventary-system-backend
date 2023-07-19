import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HsbusersService } from './hsbusers.service';
import { HsbuserDto } from './dto/create-hsbuser.dto';
import { UpdateHsbuserDto } from './dto/update-hsbuser.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class HsbusersController {
  constructor(private readonly hsbusersService: HsbusersService) {}

  @Post()
  create(@Body() createHsbuserDto: HsbuserDto) {
    return this.hsbusersService.create(createHsbuserDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.hsbusersService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hsbusersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHsbuserDto: UpdateHsbuserDto) {
    return this.hsbusersService.update(id, updateHsbuserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hsbusersService.remove(id);
  }
}
