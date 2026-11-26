import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from '../health/health.module.js';
import { AppConfigService } from './app-config.service.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), EventEmitterModule.forRoot({ delimiter: '.' }), ScheduleModule.forRoot(), HealthModule],
  controllers: [AppController],
  providers: [AppConfigService],
})
export class AppModule {}
