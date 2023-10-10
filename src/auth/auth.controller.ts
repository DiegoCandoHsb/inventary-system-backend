import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginCredentialsDto,
  SignUpCredentialsDto,
} from './dto/create-auth.dto';

import { IsPublic } from 'src/common/decorators/is-public/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  SignUp(@Body() credentials: SignUpCredentialsDto) {
    return this.authService.register(credentials);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  LogIn(@Body() credentials: LoginCredentialsDto) {
    return this.authService.login(credentials);
  }

  @IsPublic()
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verifyToken(@Body() token: { token: string }) {
    return this.authService.verifyToken(token);
  }
}
