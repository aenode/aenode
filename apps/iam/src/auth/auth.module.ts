import { ConfigModule, ConfigService } from '@aenode/nest';
import { CryptoModule } from '@aenode/nest-crypto';
import { Module, type OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
import { AuthCacheService } from './services/auth-cache.service.js';
import { LoginService } from './services/login.service.js';
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
        const JWT_SECRET = config.getOrThrow('JWT_KEY');
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
  providers: [LoginService, RequestService, AuthCacheService],
  exports: [JwtModule, LoginService, RequestService, AuthCacheService],
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

  protected async createUser(
    username: string,
    password: string,
    roleId: number,
  ) {
    const user = await this.userService.upsertOneByUsername({
      username,
      password,
    });

    await this.userRoleService.delegate.upsert({
      where: { userId_roleId: { roleId: roleId, userId: user.id } },
      create: { userId: user.id, roleId: roleId },
      update: {},
    });
  }

  async createAdminUser() {
    const adminRole = await this.roleService.upsertOneByName({ name: 'admin' });

    const username = this.config.getOrThrow('ROOT_USERNAME');
    const password = this.config.getOrThrow('ROOT_PASSWORD');

    await this.createUser(username, password, adminRole.id);
  }

  async createReaderUser() {
    const adminRole = await this.roleService.upsertOneByName({
      name: 'reader',
    });

    const username = 'reader@aenode.io';
    const password = '!Password123.';

    await this.createUser(username, password, adminRole.id);
  }

  async onModuleInit() {
    await this.createAdminUser();
    await this.createReaderUser();
  }
}
