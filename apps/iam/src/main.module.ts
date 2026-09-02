import { PrismaClient } from '@aenode/iam-db/client';
import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { InjectClient, PrismaModule } from '@aenode/prisma/pg';
import { UserRoleModule } from './resources/user-role/user-role.module.js';

@Module({
  imports: [
    AppModule.register({
      imports: [PrismaModule.forRoot(PrismaClient), UserRoleModule],
    }),
  ],
})
export class MainModule {
  constructor(@InjectClient() protected readonly client: PrismaClient) {
    client.appUser.findMany({ include: { _count: true } });
  }
}
