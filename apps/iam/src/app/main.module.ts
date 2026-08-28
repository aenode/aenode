import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { ResourceModule } from '../resources/resource.module.js';

@Module({
  imports: [
    AppModule.register({
      imports: [ResourceModule],
    }),
  ],
  providers: [],
})
export class MainModule {}
