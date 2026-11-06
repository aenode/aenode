import { getPermissions, getRoles } from '@aenode/nest-decorators';
import {
  Injectable,
  Scope,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@aenode/nest/common';
import { Reflector } from '@aenode/nest/core';
import type { Request } from '@aenode/nest/express';
import type { ExtendedRequest } from '@aenode/types';
import { UserService } from '../user/user.service.js';

@Injectable({ scope: Scope.REQUEST })
export class PermissionGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<ExtendedRequest & Request>();

    if (req.isPublic === true) {
      return true;
    }

    const requiredRoles = getRoles(context, this.reflector);
    const requiredPermissins = getPermissions(context, this.reflector);

    const userUuid = req.user.uuid;

    if (this.userService.isAdmin(userUuid)) {
      return true;
    }

    if (requiredRoles && requiredRoles.length > 0) {
      for (const role of requiredRoles) {
        if (!this.userService.hasRole(userUuid, role)) {
          throw new UnauthorizedException(
            `User does not have the role ${role}`,
          );
        }
      }
    }

    if (requiredPermissins && requiredPermissins.length > 0) {
      for (const permission of requiredPermissins) {
        if (!this.userService.hasPermission(userUuid, permission)) {
          throw new UnauthorizedException(
            `User does not have the permission ${permission}`,
          );
        }
      }
    }

    return true;
  }
}
