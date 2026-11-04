import { Module } from '@aenode/nest/common';
import { EmailDataModule } from '../../data/index.js';
import { EmailController } from './email.controller.js';

@Module({
  imports: [EmailDataModule],
  controllers: [EmailController],
})
export class EmailModule {}
