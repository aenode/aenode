import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { SampleResolver } from './sample.resolver.js';

@Module({
  imports: [
    AppModule.register({
      providers: [SampleResolver],
    }),
  ],
  providers: [],
})
export class MainModule {}
