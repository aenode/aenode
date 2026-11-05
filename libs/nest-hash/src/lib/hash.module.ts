import { Module } from '@aenode/nest/common';
import { HashService } from './hash.service.js';

@Module({
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
