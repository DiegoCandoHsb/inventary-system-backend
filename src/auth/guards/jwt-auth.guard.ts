import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { isPublicKey } from 'src/common/decorators/is-public/is-public.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('accessJWT') {
  constructor(
    private context: Reflector,
    private readonly jwtService: JwtService,
    @Inject(AuthService) private authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.context.get(isPublicKey, context.getHandler());
    if (isPublic) return isPublic;

    let token = context.switchToHttp().getRequest<Request>()
      .headers.authorization;

    if (!token) return false;

    token = token.replace('Bearer ', '').trim();

    const tokenVerified = await this.authService.verifyToken({ token });

    return !!tokenVerified;
  }
}
