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
export type NonArrayObject = object;

export type PickRequired<T extends NonArrayObject, K extends keyof T> = Omit<
  T,
  K
> & {
  [P in K]-?: T[K];
};

export type PickOptional<T extends NonArrayObject, K extends keyof T> = Omit<
  T,
  K
> & {
  [P in K]: T[K];
};

export type Mutable<T, K extends keyof T> = {
  -readonly [P in K]: T extends object ? Mutable<T[P], keyof T[P]> : T[P];
};

export type Immutable<T, K extends keyof T> = {
  readonly [P in K]: T extends object ? Immutable<T[P], keyof T[P]> : T[P];
};

export type DeepPartial<T extends NonArrayObject> = {
  [P in keyof T]?: T[P] extends NonArrayObject ? DeepPartial<T[P]> : T[P];
};

export function types<T extends string>(value: Some<T>): Some<T> {
  return value;
}

export type Names = {
  kebab: string;
  pascal: string;
  camel: string;
  snake: string;
  constant: string;
  title: string;
  sentence: string;
};
