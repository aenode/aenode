import { PrismaClient } from '@aenode/iam-db/client';
import { CommonModule, Module } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma/pg';
import { ScopeModule } from './resources/scope/scope.module.js';

@Module({
  imports: [CommonModule, PrismaModule.forRoot(PrismaClient), ScopeModule],
})
export class AppModule {}
