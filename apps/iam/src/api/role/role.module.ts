import { Module } from '@aenode/nest';
import { RoleDataModule } from '../../data/index.js';
import { RoleController } from './role.controller.js';

@Module({
  imports: [RoleDataModule],
  controllers: [RoleController],
})
export class RoleModule {}
