export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Some<T> = T | undefined | null;
export type KeyOf<T> = keyof T;
export type Keys<T> = (keyof T)[];

export interface ClassType<T> {
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
