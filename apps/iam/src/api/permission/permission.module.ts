import { Module } from '@aenode/nest/common';
import { PermissionDataModule } from '../../data/index.js';
import { PermissionController } from './permission.controller.js';

@Module({
  imports: [PermissionDataModule],
  controllers: [PermissionController],
})
export class PermissionModule {}
