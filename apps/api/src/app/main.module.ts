import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { EchoResolver } from './echo/echo.resolver.js';

@Module({
  imports: [
    AppModule.register({
      imports: [],
    }),
  ],
  providers: [EchoResolver],
})
export class MainModule {}
