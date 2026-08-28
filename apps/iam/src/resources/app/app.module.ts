import { Module } from '@aenode/nestjs';
import { AppResolver } from './app.resolver.js';

@Module({
  providers: [AppResolver],
})
export class AppModule {}
