import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

/**
 * Common nestjs module including Config, EventEmitter, and Schedule module
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({ global: true }),
    ScheduleModule.forRoot({}),
    CacheModule.register({ isGlobal: true, ttl: 5_000 }),
  ],
})
export class CommonModule {}
