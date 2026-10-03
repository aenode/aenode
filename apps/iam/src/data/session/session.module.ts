import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { SessionService } from './session.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Session])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionDataModule {}
