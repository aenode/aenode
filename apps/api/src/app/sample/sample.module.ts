import { Module } from '@aenode/nestjs';
import { SampleResolver } from './sample.resolver.js';

@Module({
  providers: [SampleResolver],
})
export class SampleModule {}
