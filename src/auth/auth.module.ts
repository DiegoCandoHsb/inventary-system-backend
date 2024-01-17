import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HsbusersModule } from 'src/hsbusers/hsbusers.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/rjwt.stategy';
import { ConfigModule } from '@nestjs/config';
import { JwtContantsList } from './constants/jwt.Contants';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(JwtContantsList),
    JwtModule.register({}),
    HsbusersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
