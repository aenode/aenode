import { Module } from '@aenode/nest/common';
import { UserRoleDataModule } from '../../data/index.js';
import { UserRoleController } from './user-role.controller.js';

@Module({
  imports: [UserRoleDataModule],
  controllers: [UserRoleController],
})
export class UserRoleModule {}
