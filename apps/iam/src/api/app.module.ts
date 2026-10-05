import { CommonModule } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
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
})
export class AppModule {}
