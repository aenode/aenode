import { Prisma } from '@aenode/iam-db/client';
import { Module } from '@aenode/nestjs';
import { PrismaModule } from '@aenode/prisma/pg';
import { AppResolver } from './app.resolver.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.App])],
  providers: [AppResolver],
})
export class AppModule {}
