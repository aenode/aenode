import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonController } from './common.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, override: true }),
    CacheModule.register({ isGlobal: true, ttl: 5_000 }),
    EventEmitterModule.forRoot({ global: true }),
  ],
  controllers: [CommonController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class CommonModule {}
