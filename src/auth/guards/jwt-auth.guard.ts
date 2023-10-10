import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { isPublicKey } from 'src/common/decorators/is-public/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('accessJWT') {
  constructor(private context: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.context.get(isPublicKey, context.getHandler());

    if (isPublic) return isPublic;

    return super.canActivate(context);
  }
}
