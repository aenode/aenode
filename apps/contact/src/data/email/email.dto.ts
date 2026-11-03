import type { Prisma } from '@aenode/contact-db';
import { Prop } from '@aenode/prop';

export class UserEmail implements Prisma.EmailModel {
  @Prop() id: number;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
  @Prop() isActive: boolean;
  @Prop() email: string;
  @Prop() userId: number;
}
