import { PrismaClient } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { CacheInterceptor, CacheModule } from '@aenode/nest/cache';
import { Module } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import { APP_INTERCEPTOR } from '@aenode/nest/core';
import { EventEmitterModule } from '@aenode/nest/emitter';
import { AppController } from './app.controller.js';
import { OtpModule } from './otp/otp.module.js';
import { PermissionModule } from './permission/permission.module.js';
import { RolePermissionModule } from './role-permission/role-permission.module.js';
import { RoleModule } from './role/role.module.js';
import { SessionModule } from './session/session.module.js';
import { UserRoleModule } from './user-role/user-role.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    EventEmitterModule.forRoot({ global: true, delimiter: '.' }),
    CacheModule.register({ isGlobal: true, ttl: 5_000 }),
    PrismaClientModule.register(PrismaClient),
    OtpModule,
    PermissionModule,
    RoleModule,
    RolePermissionModule,
    SessionModule,
    UserModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
