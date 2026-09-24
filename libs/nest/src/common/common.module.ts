import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonController } from './common.controller.js';

export * from '@nestjs/cache-manager';
export * from '@nestjs/config';
export * from '@nestjs/event-emitter';
export * from '@nestjs/swagger';
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    EventEmitterModule.forRoot({ global: true }),
    CacheModule.register({ ttl: 5_000 }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
  controllers: [CommonController],
})
export class CommonModule {}
