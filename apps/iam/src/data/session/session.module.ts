import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { SessionService } from './session.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Session])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionDataModule {}
