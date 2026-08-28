import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { SampleModule } from './sample/sample.module.js';

@Module({
  imports: [
    AppModule.register({
      imports: [SampleModule],
    }),
  ],
  providers: [],
})
export class MainModule {}
