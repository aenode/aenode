import { isPublic } from '@aenode/nest-decorators';
import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@aenode/nest/common';
import { Reflector } from '@aenode/nest/core';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { type ExtendedRequest, type UserJwtData } from '@aenode/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<ExtendedRequest & Request>();

    if (isPublic(context, this.reflector)) {
      return true;
    }
    const token = this.extractBearerToken(req);
    const payload = await this.jwt.verifyAsync<UserJwtData>(token);
    req.user = payload;

    return true;
  }

  extractBearerToken(req: ExtendedRequest & Request) {
    const authorization = req.headers.authorization;
    const [type, token] = authorization?.split(' ') ?? [];

    if (type === 'Bearer' && token) {
      return token;
    }
    throw new UnauthorizedException('Token not found ');
  }
}
