import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';

@Module({
  imports: [
    AppModule.register({
      providers: [],
    }),
  ],
  providers: [],
})
export class MainModule {}
