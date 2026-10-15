import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonController } from './common.controller.js';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    EventEmitterModule.forRoot({ global: true }),
    CacheModule.register({ isGlobal: true, ttl: 5_000 }),
  ],
  controllers: [CommonController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
  exports: [ConfigModule, EventEmitterModule, CacheModule],
})
export class CommonModule {}
