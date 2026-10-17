import { Module } from '@aenode/nest';
import { UserDataModule } from '../../data/index.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [UserDataModule],
  controllers: [UserController],
})
export class UserModule {}
