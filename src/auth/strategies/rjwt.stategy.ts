import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtContantsList } from '../constants/jwt.Contants';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refreshJWT',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtContantsList().refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToke = request
      .get('authorizatio')
      .replace('Bearer', '')
      .trim();
    return {
      ...payload,
      refreshToke,
    };
  }
}
