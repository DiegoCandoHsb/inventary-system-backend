import { Module } from '@nestjs/common';
import { HsbusersService } from './hsbusers.service';
import { HsbusersController } from './hsbusers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hsbuser } from './entities/hsbuser.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Hsbuser]), JwtModule.register({})],
  controllers: [HsbusersController],
  providers: [HsbusersService],
  exports: [HsbusersService],
})
export class HsbusersModule {}
