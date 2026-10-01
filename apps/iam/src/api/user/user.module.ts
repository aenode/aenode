import { Module } from '@nestjs/common';
import { UserDataModule } from '../../data/index.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [UserDataModule],
  controllers: [UserController],
})
export class UserModule {}
