import { Module } from '@aenode/nest/common';
import { UserDataModule } from '../../data/index.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [UserDataModule],
  controllers: [UserController],
})
export class UserModule {}
