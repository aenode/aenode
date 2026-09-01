import { PrismaClient } from '@aenode/iam-db/client';
import { Module } from '@aenode/nestjs';
import { AppModule } from '@aenode/nestjs/graphql';
import { PrismaModule } from '@aenode/prisma/pg';

@Module({
  imports: [
    AppModule.register({
      imports: [PrismaModule.forRoot(PrismaClient)],
    }),
  ],
})
export class MainModule {
  constructor(protected readonly client: PrismaClient) {
    client.appUser.findMany({
      select: { userRoles: {} },
    });
  }
}
