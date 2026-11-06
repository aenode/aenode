import { isPublic } from '@aenode/nest-decorators';
import {
  Injectable,
  Scope,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@aenode/nest/common';
import { Reflector } from '@aenode/nest/core';
import { type Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import type { ExtendedRequest, UserJwtData } from '@aenode/types';
import { extractBearerToken } from '../utils/extract-bearer-token.js';

/**
 * Check the target resource is public or check the user is authenciated and save the user information to the `request.user`.
 *
 */
@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ExtendedRequest & Request>();
    const isPublicResource = isPublic(context, this.reflector);

    req.isPublic = isPublicResource;

    if (req.isPublic === true) {
      return true;
    }

    const token = extractBearerToken(req);
    const user = await this.jwt.verifyAsync<UserJwtData>(token);
    req.user = user;

    if (!token) {
      throw new UnauthorizedException('Authentication token is not provided');
    }

    return true;
  }
}
