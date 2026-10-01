import { Module } from '@nestjs/common';
import { RoleDataModule } from '../../data/index.js';
import { RoleController } from './role.controller.js';

@Module({
  imports: [RoleDataModule],
  controllers: [RoleController],
})
export class RoleModule {}
