import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginCredentialsDto,
  SignUpCredentialsDto,
} from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  SignUp(@Body() credentials: SignUpCredentialsDto) {
    return this.authService.register(credentials);
  }

  @Post('login')
  LogIn(@Body() credentials: LoginCredentialsDto) {
    return this.authService.login(credentials);
  }
}
