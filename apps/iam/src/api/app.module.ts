import { APP_GUARD, CommonModule } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { AuthGuard, PermissionGuard } from '../auth/index.js';
import { PrismaClient } from '../generated/prisma/client.js';
import { SessionModule } from './session/session.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    CommonModule,
    PrismaModule.forRoot(PrismaClient),
    AuthModule,
    UserModule,
    SessionModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule {}
