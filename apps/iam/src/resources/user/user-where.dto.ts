import { Prop, InputType }  from "@aenode/nestjs/graphql"
import *  as F  from "@aenode/nestjs/graphql"
@InputType()
export class UserWhereDto {
  @Prop({ object: ()=> F.IntFilterDto } ) id?: F.IntFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) uuid?: F.StringFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) createdAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) updatedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) deletedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.BooleanFilterDto } ) isActive?: F.BooleanFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) fullName?: F.StringFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) username?: F.StringFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) password?: F.StringFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) lastLogin?: F.DateFilterDto;
} 