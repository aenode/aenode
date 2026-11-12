import { Env } from '@aenode/constants';
import { EncryptionModule } from '@aenode/nest-encrypt';
import { HashModule } from '@aenode/nest-hash';
import { OtpManagerModule } from '@aenode/nest-otp';
import { Module, type OnModuleInit } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';
import { APP_GUARD } from '@aenode/nest/core';
import { JwtModule } from '@aenode/nest/jwt';
import {
  OtpDataModule,
  RoleDataModule,
  RoleService,
  SessionDataModule,
  SessionService,
  UserDataModule,
  UserRoleDataModule,
  UserRoleService,
  UserService,
} from '../data/index.js';
import { AuthUser } from './auth-user.js';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './guards/auth.guard.js';
import { PermissionGuard } from './guards/permission.guard.js';
import { LoginControler } from './login/login.controller.js';
import { LoginService } from './login/login.service.js';

@Module({
  imports: [
    EncryptionModule.register(),
    OtpManagerModule,
    HashModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const secret = config.get(Env.AUTH.JWT_SECRET);
        const issuer = config.get(Env.AUTH.JWT_ISSUER);
        const audience = config.get(Env.AUTH.JWT_AUDIENCE);
        return {
          global: true,
          secret,

          signOptions: {
            issuer,
            audience,
          },
        };
      },
    }),
    UserDataModule,
    SessionDataModule,
    OtpDataModule,
    RoleDataModule,
    UserRoleDataModule,
  ],
  controllers: [LoginControler],
  providers: [
    AuthService,
    LoginService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AuthModule implements OnModuleInit {
  constructor(
    protected readonly config: ConfigService,
    protected readonly userService: UserService,
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
    protected readonly sessionService: SessionService,
  ) {}

  async onModuleInit() {
    const ROOT_USERNAME = this.config.getOrThrow(Env.AUTH.ROOT_USERNAME);
    const ROOT_PASSWORD = this.config.getOrThrow(Env.AUTH.ROOT_PASSWORD);

    await this.userService.upsertOneByUsername({
      username: ROOT_USERNAME,
      password: ROOT_PASSWORD,
    });

    const rootUser =
      await this.userService.findUniqueOneByUsername(ROOT_USERNAME);

    console.log(rootUser);

    const foundUsers = await this.userService.findManyUsersWithRelations();

    AuthUser.loadUsers(...foundUsers);

    if (rootUser) {
      const createdRole = await this.roleService.upsertOneByName({
        name: 'admin',
      });

      await this.userRoleService.upsertOneByUserIdAndRoleId({
        roleId: createdRole.id,
        userId: rootUser.id,
      });
    }

    const sessions = await this.sessionService.findMany();

    AuthUser.loadSessions(
      ...sessions.map((e) => [e.id, e.userId] as [number, number]),
    );
  }
}
