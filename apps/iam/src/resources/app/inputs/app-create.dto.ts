import type { Prisma } from '@aenode/iam-db/client';
import { InputType, Prop } from '@aenode/nestjs/graphql';

@InputType()
export class AppCreateDto implements Prisma.AppUncheckedCreateInput {
  @Prop({ isRequired: true }) name: string;
  @Prop() description?: string;
  @Prop() url?: string;
}
