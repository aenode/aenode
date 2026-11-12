import { getPermissions, getRoles, isPublic } from '@aenode/nest-decorators';
import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@aenode/nest/common';
import { Reflector } from '@aenode/nest/core';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { type ExtendedRequest } from '@aenode/types';
import { AuthUser } from '../auth-user.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<ExtendedRequest & Request>();

    if (isPublic(context, this.reflector)) {
      return true;
    }

    const user = req.user;

    const authUser = AuthUser.findUserBySessionId(user.sub);

    if (!authUser) {
      throw new UnauthorizedException('Invalid user session');
    }

    if (authUser.hasRoles('admin')) {
      return true;
    }

    const requiredPermissions = getPermissions(context, this.reflector);
    const requiredRoles = getRoles(context, this.reflector);

    if (requiredPermissions && requiredPermissions.length > 0) {
      if (!authUser.hasPermissions(...requiredPermissions)) {
        return false;
      }
    }

    if (requiredRoles && requiredRoles.length > 0) {
      if (!authUser.hasRoles(...requiredRoles)) {
        return false;
      }
    }

    return true;
  }

  extractBearerToken(req: ExtendedRequest & Request) {
    const authorization = req.headers.authorization;
    const [type, token] = authorization ?? [];

    if (type === 'Bearer' && token) {
      return token;
    }
    throw new UnauthorizedException('Token not found ');
  }
}
