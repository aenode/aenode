import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { SampleResolver } from './sample/sample.resolver.js';
@Module({
  imports: [
    AppModule.register({
      imports: [],
      providers: [SampleResolver],
    }),
  ],
  providers: [],
})
export class MainModule {}
