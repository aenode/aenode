import { PrismaClient } from '@aenode/contact-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import { AppController } from './app.controller.js';
import { EmailModule } from './email/email.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PrismaClientModule.register(PrismaClient),
    EmailModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
