import type { Prisma } from '@aenode/iam-db/client';
import { ObjectType, Prop } from '@aenode/nestjs/graphql';

@ObjectType()
export class AppReadDto implements Prisma.AppModel {
  @Prop() name: string;
  @Prop() id: number;
  @Prop() uuid: string;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
  @Prop() deletedAt: Date;
  @Prop() isActive: boolean;
  @Prop() description: string;
  @Prop() url: string;
}
