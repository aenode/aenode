import { InputType, Prop } from '@aenode/nestjs/graphql';
import { AppIncludeDto } from './app-include.dto.js';
import { AppOmitDto } from './app-omit.dto.js';
import { AppOrderByDto } from './app-order-by.dto.js';
import { AppSelectDto } from './app-select.dto.js';

@InputType()
export class AppFindManyArgsDto {
  @Prop({ min: 1, defaultValue: 20 }) take?: number;
  @Prop({ min: 0, defaultValue: 20 }) skip?: number;

  @Prop({ object: () => AppOrderByDto }) orderBy?: AppOrderByDto;

  @Prop({
    object: () => AppSelectDto,
    dependencies: { notWith: ['omit', 'include'] },
  })
  select?: AppSelectDto;

  @Prop({
    object: () => AppOmitDto,
    dependencies: { notWith: ['select', 'include'] },
  })
  omit?: AppOmitDto;

  @Prop({
    object: () => AppIncludeDto,
    dependencies: { notWith: ['select', 'omit'] },
  })
  include?: AppIncludeDto;
}
