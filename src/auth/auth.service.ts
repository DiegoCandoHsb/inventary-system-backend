import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LoginCredentialsDto,
  SignUpCredentialsDto,
} from './dto/create-auth.dto';
import { compare } from 'bcrypt';

import { HsbusersService } from 'src/hsbusers/hsbusers.service';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtContantsList } from './constants/jwt.Contants';
import { JwtPayload, TokenList } from './interfaces/';
import { ConfigType } from '@nestjs/config';

interface JwtOptions extends JwtVerifyOptions {
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  // expiration token list
  private tokenExpirations: TokenList = {
    atoken: '20m',
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
      throw new UnauthorizedException(`Email or password incorrect`);

    const payload = { id: user.id, name: user.name, role: 'admin' };

    const tokens = await this.getTokens(payload);

    // await this.getJWT(tokens[0].atoken);

    return {
      user,
      // tokens,
      token: tokens[0].atoken,
    };
  }

  // JWT mehtods
  async getJWT(payload: JwtPayload) {
    const token = this.jwtService.signAsync(payload, {
      secret: this.jwtConstntsList.secret,
      expiresIn: this.tokenExpirations.atoken,
    });
    return token;
  }

  async getTokens(payload: JwtPayload): Promise<TokenList[]> {
    const tokenList = await Promise.all([
      ...Object.keys(this.tokenExpirations).map(
        async (tokenName) =>
          await this.getJWTbyType(payload, tokenName as keyof TokenList),
      ),
    ]);

    return tokenList as TokenList[];
  }

  // jwt and refresh token
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

  async verifyToken(token: { token: string }) {
    return await this.jwtService
      .verifyAsync<JwtVerifyOptions>(token.token, {
        secret: this.jwtConstntsList.secret,
      })
      .then(async ({ iat, exp, ...tokenPayload }: JwtOptions) => {
        if (exp - iat <= 0) {
          return false;
        }

        const newToken = await this.getJWT(tokenPayload as JwtPayload);

        return newToken;
      })
      .catch(() => false);
  }
}
