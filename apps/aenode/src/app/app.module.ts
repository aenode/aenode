import { PrismaClient } from '@aenode/contact-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { CacheModule } from '@aenode/nest/cache';
import { Module } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import { EventEmitterModule } from '@aenode/nest/emitter';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    EventEmitterModule.forRoot({ global: true, delimiter: '.' }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CacheModule.register({ isGlobal: true, ttl: 5_000 }),
    PrismaClientModule.register(PrismaClient),
  ],
  controllers: [AppController],
})
export class AppModule {}
