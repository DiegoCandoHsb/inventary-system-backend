import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LoginCredentialsDto,
  SignUpCredentialsDto,
} from './dto/create-auth.dto';
import { compare } from 'bcrypt';

import { HsbusersService } from 'src/hsbusers/hsbusers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hsbuserService: HsbusersService,
    private readonly jwtService: JwtService,
  ) {}

  register(credentials: SignUpCredentialsDto) {
    return this.hsbuserService.create(credentials);
  }

  async login({ email, password }: LoginCredentialsDto) {
    const user = await this.hsbuserService.findOneByEmail(email);

    console.log(await compare(password, user.password));

    if (!(await compare(password, user.password)))
      throw new UnauthorizedException(`Incorrect password, please check it`);

    const payload = { id: user.id, email: user.email, role: 'admin' };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
