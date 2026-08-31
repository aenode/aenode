import { InputType } from './input-type.js';
import { Prop } from './prop.js';

export const QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
} as const;

export type QueryMode = keyof typeof QueryMode;

@InputType()
export class IntFilterDto {
  @Prop() equals?: number;
  @Prop({ type: () => Number, isArray: true }) in?: number[];
  @Prop({ type: () => Number, isArray: true }) notIn?: number[];
  @Prop() lt?: number;
  @Prop() lte?: number;
  @Prop() gt?: number;
  @Prop() gte?: number;
  @Prop({ object: () => IntFilterDto }) not?: IntFilterDto;
}

@InputType()
export class DateFilterDto {
  @Prop() equals?: Date;
  @Prop({ type: () => Date, isArray: true }) in?: Date[];
  @Prop({ type: () => Date, isArray: true }) notIn?: Date[];
  @Prop() lt?: Date;
  @Prop() lte?: Date;
  @Prop() gt?: Date;
  @Prop() gte?: Date;
  @Prop({ object: () => DateFilterDto }) not?: DateFilterDto;
}

@InputType()
export class BooleanFilterDto {
  @Prop() equals?: boolean;
  @Prop({ object: () => BooleanFilterDto }) not?: BooleanFilterDto;
}

@InputType()
export class StringFilterDto {
  @Prop() equals?: string;
  @Prop({ type: () => String, isArray: true }) in?: string[];
  @Prop({ type: () => String, isArray: true }) notIn?: string[];
  @Prop() lt?: string;
  @Prop() lte?: string;
  @Prop() gt?: string;
  @Prop() gte?: string;
  @Prop() contains?: string;
  @Prop() startsWith?: string;
  @Prop() endsWith?: string;
  @Prop({ enum: () => QueryMode, defaultValue: QueryMode.insensitive })
  mode?: QueryMode = QueryMode.insensitive;
  @Prop({ object: () => StringFilterDto }) not?: StringFilterDto;
}

@InputType()
export class StringArrayFilterDto {
  @Prop() isEmpty?: boolean;
  @Prop({ type: () => String, isArray: true }) has?: string;
  @Prop({ type: () => String, isArray: true }) equals?: string[];
  @Prop({ type: () => String, isArray: true }) hasEvery?: string[];
  @Prop({ type: () => String, isArray: true }) hasSome?: string[];
}

@InputType()
export class BooleanArrayFilterDto {
  @Prop() isEmpty?: boolean;
  @Prop({ type: () => Boolean, isArray: true }) equals?: boolean[];
  @Prop({ type: () => Boolean, isArray: true }) hasEvery?: boolean[];
  @Prop({ type: () => Boolean, isArray: true }) hasSome?: boolean[];
}

@InputType()
export class IntArrayFilterDto {
  @Prop() isEmpty?: boolean;
  @Prop({ type: () => Number, isArray: true }) has?: number;
  @Prop({ type: () => Number, isArray: true }) equals?: number[];
  @Prop({ type: () => Number, isArray: true }) hasEvery?: number[];
  @Prop({ type: () => Number, isArray: true }) hasSome?: number[];
}

@InputType()
export class JsonFilterDto {
  @Prop({ enum: () => QueryMode }) mode?: QueryMode;
  @Prop({ type: () => String }) string_contains?: string;
  @Prop({ object: () => JsonFilterDto }) not: JsonFilterDto;
}
