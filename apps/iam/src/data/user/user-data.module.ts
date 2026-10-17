import { Module } from '@aenode/nest';
import { CryptoModule } from '@aenode/nest-crypto';
import { PrismaModule } from '@aenode/prisma';
import { Prisma } from '../../generated/prisma/client.js';
import { UserService } from './user.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.User]), CryptoModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserDataModule {}
