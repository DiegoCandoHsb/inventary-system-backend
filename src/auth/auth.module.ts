import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HsbusersModule } from 'src/hsbusers/hsbusers.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtContant } from './jwt-contant';

@Module({
  imports: [
    JwtModule.register({
      secret: JwtContant.secret,
      signOptions: { expiresIn: '10s' },
    }),
    HsbusersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
