import { Module } from '@aenode/nest';
import { PrismaModule } from '@aenode/prisma/pg';
import { UserController } from './user.controller.js';
import { UserModelName } from './user.js';
import { UserService } from './user.service.js';

@Module({
  imports: [PrismaModule.forFeature([UserModelName])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
