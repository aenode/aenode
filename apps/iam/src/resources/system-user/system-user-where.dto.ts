import { Prop, InputType }  from "@aenode/nestjs/graphql"
import *  as F  from "@aenode/nestjs/graphql"
import *  as E  from "../common/enum-filters.js"
@InputType()
export class SystemUserWhereDto {
  @Prop({ object: ()=> F.IntFilterDto } ) id?: F.IntFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) createdAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) updatedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) deletedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.BooleanFilterDto } ) isActive?: F.BooleanFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) username?: F.StringFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) password?: F.StringFilterDto;
  @Prop({ object: ()=> E.SystemRoleEnumFilterDto } ) role?: E.SystemRoleEnumFilterDto;
  @Prop({ object: ()=> E.SystemRoleEnumArrayFilterDto } ) roles?: E.SystemRoleEnumArrayFilterDto;
} 