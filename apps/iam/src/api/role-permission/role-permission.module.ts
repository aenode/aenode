import { Module } from '@aenode/nest/common';
import { RolePermissionDataModule } from '../../data/index.js';
import { RolePermissionController } from './role-permission.controller.js';

@Module({
  imports: [RolePermissionDataModule],
  controllers: [RolePermissionController],
})
export class RolePermissionModule {}
