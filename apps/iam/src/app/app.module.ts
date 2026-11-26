import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  controllers: [AppController],
})
export class AppModule {}
