import { PrismaClient } from '@aenode/iam-db/client';
import { Module } from '@aenode/nestjs';
import { PrismaModule } from '@aenode/prisma/pg';
import { AppModule } from './app/app.module.js';

@Module({
  imports: [PrismaModule.forRoot(PrismaClient), AppModule],
})
export class ResourceModule {}
