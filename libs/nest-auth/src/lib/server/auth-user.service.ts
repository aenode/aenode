import type {
  AuthUserDto,
  AuthUserSessionCreateDto,
  AuthUserSessionDto,
  ResetPasswordDto,
} from './dtos/index.js';

export abstract class AuthUserService {
  abstract findByIdOrThrow(id: number): Promise<AuthUserDto | never>;
  abstract deleteSessionById(id: number): Promise<AuthUserDto | never>;
  abstract deactivateAllSessionsByUserId(
    id: number,
  ): Promise<AuthUserDto | never>;
  abstract findByUsernameOrThrow(
    username: string,
  ): Promise<AuthUserDto | never>;
  abstract findUniqueOneByUuidOrThrow(id: number): Promise<AuthUserDto | never>;
  abstract updateOptSecretByIdOrThrow(
    id: number,
    secret: string | null,
  ): Promise<AuthUserDto | never>;
  abstract updatePasswordByIdOrThrow(
    id: number,
    data: ResetPasswordDto,
  ): Promise<AuthUserDto | never>;

  abstract createSession(
    data: AuthUserSessionCreateDto,
  ): Promise<AuthUserDto | never>;

  abstract updateSessionTokenById(
    sessionId: number,
    tokenHash: string,
  ): Promise<AuthUserSessionDto>;
}
