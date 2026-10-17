import { Module } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma';
import { Prisma } from '../../generated/prisma/client.js';
import { ScopeService } from './scope.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Scope])],
  providers: [ScopeService],
  exports: [ScopeService],
})
export class ScopeDataModule {}
