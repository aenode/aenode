import { Prop } from './prop.js';

export const QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
} as const;

export type QueryMode = keyof typeof QueryMode;

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

export class DateFilterDto {
  @Prop() equals?: Date;
  @Prop({ type: () => Date, isArray: true }) in?: Date[];
  @Prop({ type: () => Date, isArray: true }) notIn?: Date[];
  @Prop() lt?: Date;
  @Prop() lte?: Date;
  @Prop() gt?: Date;
  @Prop() gte?: Date;
  @Prop() not?: DateFilterDto;
}

export class BooleanFilterDto {
  @Prop() equals?: boolean;
  @Prop({ object: () => BooleanFilterDto }) not?: BooleanFilterDto;
}

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
  @Prop({ enum: () => QueryMode }) mode?: QueryMode;
  @Prop({ object: () => StringFilterDto }) not?: StringFilterDto;
}
