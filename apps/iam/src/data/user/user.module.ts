import { Prisma } from '@aenode/iam-db';
import { HashModule } from '@aenode/nest-hash';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { UserService } from './user.service.js';

@Module({
  imports: [HashModule, PrismaClientModule.feature([Prisma.ModelName.User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserDataModule {}
