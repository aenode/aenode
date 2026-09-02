import { Prisma } from '@aenode/iam-db/client';
import { Module } from '@aenode/nestjs';
import { PrismaModule } from '@aenode/prisma/pg';
import { UserRoleResolver } from './user-role.resolver.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.UserRole])],
  providers: [UserRoleResolver],
})
export class UserRoleModule {}
