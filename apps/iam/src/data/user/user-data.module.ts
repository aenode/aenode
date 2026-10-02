import { CryptoModule } from '@aenode/nest-crypto';
import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { UserService } from './user.service.js';

@Module({
  imports: [
    PrismaModule.forFeature([Prisma.ModelName.User]),
    CryptoModule.register(),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserDataModule {}
