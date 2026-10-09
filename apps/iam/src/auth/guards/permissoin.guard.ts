import { getPermissions, getRoles, isPublic, Reflector } from '@aenode/nest';
import {
  Injectable,
  Scope,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { AuthCacheService } from '../services/auth-cache.service.js';
import { RequestService } from '../services/request.service.js';

@Injectable({ scope: Scope.REQUEST })
export class PermissionGuard implements CanActivate {
  constructor(
    protected readonly authCache: AuthCacheService,
    protected readonly requestService: RequestService,
    protected readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    if (isPublic(context, this.reflector)) {
      return true;
    }
    const session = this.requestService.session;

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }
    const userId = this.authCache.userId(session.sub);

    if (!userId) {
      throw new UnauthorizedException('User id is not resovled from cache');
    }

    if (this.authCache.isAdmin(userId)) {
      return true;
    }

    const requiredPermissions = getPermissions(context, this.reflector);
    const requiredRoles = getRoles(context, this.reflector);

    for (const rp of requiredPermissions) {
      if (!this.authCache.hasPermission(userId, rp)) {
        return false;
      }
    }

    for (const rr of requiredRoles) {
      if (!this.authCache.hasRole(userId, rr)) {
        return false;
      }
    }

    return true;
  }
}
