import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginCredentialsDto,
  SignUpCredentialsDto,
} from './dto/create-auth.dto';

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
}
