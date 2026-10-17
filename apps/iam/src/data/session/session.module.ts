import { Module } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma';
import { Prisma } from '../../generated/prisma/client.js';
import { SessionService } from './session.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Session])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionDataModule {}
