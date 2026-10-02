import type { AuthUserDto } from './dtos/auth-user.dto.js';
import type { ResetPasswordDto } from './dtos/reset-password.dto.js';

export abstract class AuthUserService {
  abstract findByUsername(username: string): Promise<AuthUserDto | undefined>;
  abstract findUniqueOneByUuid(uuid: string): Promise<AuthUserDto | undefined>;
  abstract updateOtpSecretByUsername(
    username: string,
    secret: string,
  ): Promise<AuthUserDto | undefined>;
  abstract updatePasswordByUuid(
    uuid: string,
    data: ResetPasswordDto,
  ): Promise<AuthUserDto | undefined>;
}
