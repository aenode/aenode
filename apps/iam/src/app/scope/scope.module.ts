import { Prisma } from '@aenode/iam-db/client';
import { Module } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma/pg';
import { ScopeController } from './scope.controller.js';
import { ScopeService } from './scope.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Scope])],
  controllers: [ScopeController],
  providers: [ScopeService],
  exports: [ScopeService],
})
export class ScopeModule {}
