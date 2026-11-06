import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { UserService } from './user.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserDataModule {}
