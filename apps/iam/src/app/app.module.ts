import { CommonModule } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [CommonModule, PrismaModule.forRoot(PrismaClient), UserModule],
})
export class AppModule {}
