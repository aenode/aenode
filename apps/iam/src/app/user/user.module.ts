import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [
    PrismaModule.forFeature([
      Prisma.ModelName.User,
      Prisma.ModelName.UserRole,
      Prisma.ModelName.UserTask,
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
