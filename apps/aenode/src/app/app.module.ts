import { Module } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import { AppController } from './app.controller.ts';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true })],
  controllers: [AppController],
})
export class AppModule {}
