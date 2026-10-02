import type { AuthUserDto } from './dtos/auth-user.dto.js';

export abstract class AuthUserService {
  abstract findByUsername(username: string): Promise<AuthUserDto | undefined>;
  abstract findUniqueOneByUuid(uuid: string): Promise<AuthUserDto | undefined>;
}
