import { Prop, InputType }  from "@aenode/nestjs/graphql"
import *  as F  from "@aenode/nestjs/graphql"
@InputType()
export class AppWhereDto {
  @Prop({ object: ()=> F.IntFilterDto } ) id?: F.IntFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) uuid?: F.StringFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) createdAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) updatedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.DateFilterDto } ) deletedAt?: F.DateFilterDto;
  @Prop({ object: ()=> F.BooleanFilterDto } ) isActive?: F.BooleanFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) name?: F.StringFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) description?: F.StringFilterDto;
  @Prop({ object: ()=> F.StringFilterDto } ) url?: F.StringFilterDto;
} 