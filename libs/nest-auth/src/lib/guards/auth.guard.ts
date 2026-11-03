/* eslint-disable @typescript-eslint/consistent-type-imports */

import {
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@aenode/nest/common';
import { Reflector } from '@aenode/nest/core';
import { type Request } from '@aenode/nest/express';
import { type ExtendedRequest } from '@aenode/types';
import { isPublic } from '../metadata/public.js';
import { extractBearerToken } from '../utils/index.js';

/**
 * Check the target resource is public or check the user is authenciated and save the user information to the `request.user`.
 *
 */
export class AuthGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ExtendedRequest & Request>();

    const isPublicResource = isPublic(context, this.reflector);

    if (isPublicResource) {
      return true;
    }

    const token = extractBearerToken(req);

    if (!token) {
      throw new UnauthorizedException('Authentication token is not provided');
    }

    return true;
  }
}
