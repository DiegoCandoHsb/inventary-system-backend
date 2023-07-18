import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtContantsList } from '../constants/jwt.Contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'accessJWT') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtContantsList().secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
