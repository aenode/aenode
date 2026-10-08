import { ConfigModule, ConfigService } from '@aenode/nest';
import { CryptoModule } from '@aenode/nest-crypto';
import { Module, type OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';
import {
  OperationService,
  OtpDataModule,
  PermissionService,
  PermissoinDataModule,
  ResourceDataModule,
  ResourceService,
  RoleDataModule,
  RoleService,
  ScopeDataModule,
  ScopeService,
  SessionDataModule,
  UserDataModule,
  UserRoleDataModule,
  UserRoleService,
  UserService,
} from '../data/index.js';
import { OperationDataModule } from '../data/operation/operation-data.module.js';
import { LoginController } from './controllers/login.controller.js';
import { LogoutController } from './controllers/logout.controller.js';
import { LoginService } from './services/login.service.js';
import { PermissionCacheService } from './services/permission-cache.service.js';
import { RequestService } from './services/request.service.js';

@Module({
  imports: [
    CryptoModule.register(),
    UserDataModule,
    RoleDataModule,
    PermissoinDataModule,
    OperationDataModule,
    OtpDataModule,
    SessionDataModule,
    ResourceDataModule,
    ScopeDataModule,
    UserRoleDataModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const JWT_SECRET = config.get('JWT_KEY', randomBytes(12).toString());
        return {
          global: true,
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: '1y',
          },
        };
      },
    }),
  ],
  controllers: [LoginController, LogoutController],
  providers: [LoginService, RequestService, PermissionCacheService],
  exports: [JwtModule, LoginService, RequestService, PermissionCacheService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    protected readonly config: ConfigService,
    protected readonly userService: UserService,
    protected readonly roleService: RoleService,
    protected readonly resourceService: ResourceService,
    protected readonly scopeService: ScopeService,
    protected readonly permissionService: PermissionService,
    protected readonly operationService: OperationService,
    protected readonly userRoleService: UserRoleService,
  ) {}

  async onModuleInit() {
    const username = this.config.getOrThrow('ROOT_USERNAME');
    const password = this.config.getOrThrow('ROOT_PASSWORD');

    const role = await this.roleService.upsertOneByName({ name: 'admin' });

    const user = await this.userService.upsertOneByUsername({
      username,
      password,
    });

    await this.userRoleService.delegate.upsert({
      where: { userId_roleId: { roleId: role.id, userId: user.id } },
      create: { userId: user.id, roleId: role.id },
      update: {},
    });
  }
}
