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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HsbusersService } from './hsbusers.service';
import { HsbuserDto } from './dto/create-hsbuser.dto';
import { UpdateHsbuserDto } from './dto/update-hsbuser.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
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

  @Post('download')
  downloadFile(@Body() payload: { users: HsbuserDto[]; fileName: string }) {
    return this.hsbusersService.downloadUsersXlsx(
      payload.users,
      payload.fileName,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.hsbusersService.uploadUsersXlsx(file);
  }
}
