import { Prop, InputType }  from "@aenode/nestjs/graphql"
import *  as F  from "@aenode/nestjs/graphql"
@InputType()
export class RolePermissionWhereDto {
  @Prop({ object: ()=> F.IntFilterDto } ) id?: F.IntFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) createdAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) updatedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) deletedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.BooleanFilterDto } ) isActive?: F.BooleanFilterDto;
  @Prop({ object: ()=> F.IntFilterDto } ) appId?: F.IntFilterDto;
  @Prop({ object: ()=> F.IntFilterDto } ) roleId?: F.IntFilterDto;
  @Prop({ object: ()=> F.IntFilterDto } ) permissionId?: F.IntFilterDto;
} 