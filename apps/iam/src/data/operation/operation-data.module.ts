import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { OperationService } from './operation.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Operation])],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationDataModule {}
