import {
  type CanActivate,
  type ExecutionContext,
  type ExtendedRequest,
  Injectable,
  isPublic,
  Scope,
  UnauthorizedException,
} from '@aenode/nest';
import { JwtPayloadDto } from '@aenode/nest-auth';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { AuthCacheService } from '../services/auth-cache.service.js';
import { RequestService } from '../services/request.service.js';

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwtService: JwtService,
    protected readonly requestService: RequestService,
    protected readonly authCacheService: AuthCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(context, this.reflector)) {
      return (this.requestService.isPublic = true);
    }

    const req = context.switchToHttp().getRequest<ExtendedRequest>();
    const token = this.extractTokenFromHeader(req);

    try {
      const session = await this.jwtService.verifyAsync<JwtPayloadDto>(token);

      const userId = this.authCacheService.getUserIdBySessionId(session.sub);

      if (!userId) {
        throw new UnauthorizedException(`User id cannot find in cache`);
      }

      req.user = { id: userId };

      if (session) {
        this.requestService.session = session;
        return true;
      }
      return false;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(req: Request): string {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [schema, token] = authorization.split(' ').slice(0, 2);

    if (schema !== 'Bearer') {
      throw new UnauthorizedException(
        `Bearer token is required but found ${schema}`,
      );
    }
    if (!token) {
      throw new UnauthorizedException('Token is not provided');
    }

    return token;
  }
}
