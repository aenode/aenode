import { InputType, PartialType, Prop } from '@aenode/nestjs/graphql';
import * as P from '../../prisma/client.js';

@InputType()
export class SystemUserCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) username: string;
  @Prop({ format: 'password', isRequired: true }) password: string;
  @Prop({ enum: () => P.$Enums.SystemRole, isRequired: true })
  role: P.$Enums.SystemRole;
}

@InputType()
export class SystemUserUpdateDto extends PartialType(SystemUserCreateDto) {}
