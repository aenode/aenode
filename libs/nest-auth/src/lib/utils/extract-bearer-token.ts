import { UnauthorizedException } from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import type { ExtendedRequest } from '@aenode/types';

/**
 * Extract the bearer token from the authorization header, validate, and return.
 *
 * @param request Express request
 * @returns authentication token
 */
export function extractBearerToken(request: ExtendedRequest & Request) {
  const bearerRaw = request.headers.authorization;

  if (!bearerRaw) {
    throw new UnauthorizedException('Bearer token is not provided');
  }

  const [type, token] = bearerRaw.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedException('Invalid bearer format');
  }

  return token;
}
