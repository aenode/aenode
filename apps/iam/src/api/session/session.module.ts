import { Module } from '@aenode/nest';
import { SessionDataModule } from '../../data/index.js';
import { SessionController } from './session.controller.js';

@Module({
  imports: [SessionDataModule],
  controllers: [SessionController],
})
export class SessionModule {}
