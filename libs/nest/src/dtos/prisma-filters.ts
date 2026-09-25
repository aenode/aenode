import { Prop } from '@aenode/nest-prop';

export class NumberFilterDto {
  @Prop() equals?: number;
  @Prop() not?: NumberFilterDto;
  @Prop({ type: Number }) in?: number[];
  @Prop({ type: Number }) notIn?: number[];
  @Prop() lt?: number;
  @Prop() lte?: number;
  @Prop() gt?: number;
  @Prop() gte?: number;
}

export class StringFilterDto {
  @Prop() equals?: string;
  @Prop() not?: StringFilterDto;
  @Prop({ type: String }) in?: string[];
  @Prop({ type: String }) notIn?: string[];
  @Prop() lt?: string;
  @Prop() lte?: string;
  @Prop() gt?: string;
  @Prop() gte?: string;
  @Prop() contains?: string;
  @Prop() startsWith?: string;
  @Prop() endsWith?: string;
  @Prop({ isIn: ['default', 'insensitive'] }) mode?: 'default' | 'insensitive';
}

export class BooleanFilterDto {
  @Prop() equals?: boolean;
  @Prop() not?: boolean;
}

export class DateFilterDto {
  @Prop() equals?: Date;
  @Prop() not?: DateFilterDto;
  @Prop({ type: Date }) in?: Date[];
  @Prop({ type: Date }) notIn?: Date[];
  @Prop() lt?: Date;
  @Prop() lte?: Date;
  @Prop() gt?: Date;
  @Prop() gte?: Date;
}

export class UUIDFilterDto {
  @Prop({ format: 'uuid' }) equals?: string;
  @Prop({ format: 'uuid' }) not?: UUIDFilterDto;
  @Prop({ format: 'uuid', type: String }) in?: string[];
  @Prop({ format: 'uuid', type: String }) notIn?: string[];
  @Prop({ format: 'uuid' }) lt?: string;
  @Prop({ format: 'uuid' }) lte?: string;
  @Prop({ format: 'uuid' }) gt?: string;
  @Prop({ format: 'uuid' }) gte?: string;
}

export class JSONFilterDto {
  @Prop() equals?: unknown;
  @Prop() not?: JSONFilterDto;
  @Prop({ type: String }) path?: string[];
  @Prop() string_contains?: string;
  @Prop() string_starts_with?: string;
  @Prop() string_ends_with?: string;
  @Prop() array_contains?: unknown;
  @Prop() array_starts_with?: unknown;
  @Prop() array_ends_with?: unknown;
}

export class ArrayStringFilterDto {
  @Prop({ type: String }) equals?: string[];
  @Prop() has?: string;
  @Prop({ type: String }) hasEvery?: string[];
  @Prop({ type: String }) hasSome?: string[];
  @Prop() isEmpty?: boolean;
}

export class ArrayNumberFilterDto {
  @Prop({ type: Number }) equals?: number[];
  @Prop() has?: number;
  @Prop({ type: Number }) hasEvery?: number[];
  @Prop({ type: Number }) hasSome?: number[];
  @Prop() isEmpty?: boolean;
}
