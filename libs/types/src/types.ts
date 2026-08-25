export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Some<T> = T | undefined | null;
export type KeyOf<T> = keyof T;
export type Keys<T> = (keyof T)[];

export type IndexType<I extends readonly unknown[]> = I[number];

export type Entries<T extends object> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

export type UniqueKeys<
  T extends object,
  K extends readonly (keyof T)[],
  Seen extends keyof T = never,
> = K extends readonly [
  infer Head extends keyof T,
  ...infer Tail extends (keyof T)[],
]
  ? Head extends Seen
    ? never
    : readonly [Head, ...UniqueKeys<T, Tail, Seen | Head>]
  : K;

export interface ClassType<T = any> {
  new (...args: any[]): T;
}

export type RequiredKeys<T extends object, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[K];
};

export type OptionalKeys<T extends object, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[K];
};

export type PickRequired<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};

export type PickOptional<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};

export type Mutable<T, K extends keyof T> = {
  -readonly [P in K]: T extends object ? Mutable<T[P], keyof T[P]> : T[P];
};

export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Names = {
  kebab: string;
  pascal: string;
  camel: string;
  snake: string;
  constant: string;
  title: string;
  sentence: string;
};

export class StringArray extends Array<string> {
  static readonly itemType = String;
}
export class NumberArray extends Array<string> {
  static readonly itemType = Number;
}
export class BooleanArray extends Array<string> {
  static readonly itemType = Boolean;
}
export class DateArray extends Array<string> {
  static readonly itemType = Date;
}

export class StringPromise extends Promise<string> {
  static readonly itemType = String;
}
export class NumberPromise extends Promise<string> {
  static readonly itemType = Number;
}
export class BooleanPromise extends Promise<string> {
  static readonly itemType = Boolean;
}
export class DatePromise extends Array<string> {
  static readonly itemType = Date;
}
