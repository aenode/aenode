import { PrismaClient } from '@aenode/iam-db/client';
import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { InjectClient, PrismaModule } from '@aenode/prisma/pg';
import { ResourceModule } from './generated/resources/resource.module.js';
import { RoleController } from './samples/role/role.controller.js';

@Module({
  imports: [
    AppModule.register({
      imports: [PrismaModule.forRoot(PrismaClient), ResourceModule],
      controllers: [RoleController],
    }),
  ],
})
export class MainModule {
  constructor(@InjectClient() protected readonly client: PrismaClient) {
    client.appUser.findMany({ include: { _count: true } });
  }
}
