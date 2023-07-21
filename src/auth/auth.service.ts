import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LoginCredentialsDto,
  SignUpCredentialsDto,
} from './dto/create-auth.dto';
import { compare } from 'bcrypt';

import { HsbusersService } from 'src/hsbusers/hsbusers.service';
import { JwtService } from '@nestjs/jwt';
import { JwtContantsList } from './constants/jwt.Contants';
import { JwtPayload, TokenList } from './interfaces/';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  // expiration token list
  private tokenExpirations: TokenList = {
    atoken: '1m',
    rtoken: '7d',
  };

  constructor(
    @Inject(JwtContantsList.KEY)
    private readonly jwtConstntsList: ConfigType<typeof JwtContantsList>,
    private readonly hsbuserService: HsbusersService,
    private readonly jwtService: JwtService,
  ) {}

  // register method
  register(credentials: SignUpCredentialsDto) {
    return this.hsbuserService.create(credentials);
  }

  // login method
  async login({ email, password }: LoginCredentialsDto) {
    const user = await this.hsbuserService.findOneByEmail(email);

    if (!(await compare(password, user.password)))
      throw new UnauthorizedException(`Incorrect password, please check it`);

    const payload = { id: user.id, name: user.name, role: 'admin' };

    const tokens = await this.getTokens(payload);
    return {
      user,
      tokens,
      token: tokens[0].atoken,
    };
  }

  // JWT mehtods
  async getTokens(payload: JwtPayload): Promise<TokenList[]> {
    const tokenList = await Promise.all([
      ...Object.keys(this.tokenExpirations).map(
        async (tokenName) =>
          await this.getJWTbyType(payload, tokenName as keyof TokenList),
      ),
    ]);

    return tokenList as TokenList[];
  }

  async getJWTbyType(
    payload: JwtPayload,
    tokenType: keyof TokenList,
  ): Promise<Partial<Record<keyof TokenList, string>> | number> {
    let token = '';

    // token generation
    for (let i = 0; i < Object.keys(this.tokenExpirations).length; i++) {
      // validation
      if (tokenType !== (Object.keys(this.tokenExpirations)[i] as string))
        continue;

      // token specs
      token = await this.jwtService.signAsync(payload, {
        secret: [...Object.values(this.jwtConstntsList)][i],
        expiresIn: Object.values(this.tokenExpirations)[i] as string,
      });
    }
    return {
      [tokenType]: token,
    };
  }

  // refresh access token
  // async refreshToken() {
  // }
}
