import { PrismaClient } from '@aenode/iam-db';
import { EventInterceptor } from '@aenode/nest-event';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { CacheInterceptor, CacheModule } from '@aenode/nest/cache';
import { Module } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@aenode/nest/core';
import { EventEmitterModule } from '@aenode/nest/emitter';
import { AuthModule } from '../auth/auth.module.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { PermissionGuard } from '../auth/guards/permission.guard.js';
import { UserDataModule } from '../data/index.js';
import { AppController } from './app.controller.js';
import { OtpModule } from './otp/otp.module.js';
import { PermissionModule } from './permission/permission.module.js';
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
    AuthModule,
    OtpModule,
    PermissionModule,
    RoleModule,
    SessionModule,
    UserModule,
    UserRoleModule,
    UserDataModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: EventInterceptor,
    },
  ],
})
export class AppModule {}
