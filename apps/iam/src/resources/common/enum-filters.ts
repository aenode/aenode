import { Prop, InputType} from '@aenode/nestjs/graphql';
import * as P from '../../prisma/client.js';
@InputType()
export class SystemRoleEnumFilterDto {
  @Prop({ enum:()=>P.$Enums.SystemRole }) equals?: P.$Enums.SystemRole
  @Prop({ enum:()=>P.$Enums.SystemRole, isArray:true }) in?: P.$Enums.SystemRole[]
  @Prop({ enum:()=>P.$Enums.SystemRole, isArray:true }) notIn?: P.$Enums.SystemRole[]
  @Prop({ object:()=>SystemRoleEnumFilterDto }) not?: SystemRoleEnumFilterDto
}
@InputType()
export class SystemRoleEnumArrayFilterDto {
  @Prop() isEmpty?: boolean
  @Prop({ enum: ()=>P.$Enums.SystemRole }) has?: P.$Enums.SystemRole
  @Prop({ enum: ()=>P.$Enums.SystemRole, isArray:true }) equals?: P.$Enums.SystemRole[]
  @Prop({ enum: ()=>P.$Enums.SystemRole, isArray:true }) hasEvery?: P.$Enums.SystemRole[]
  @Prop({ enum: ()=>P.$Enums.SystemRole, isArray:true }) hasSome?: P.$Enums.SystemRole[]
}