import { getPropType } from './reflect.js';

describe('getPropType', () => {
  it('should get primitive property types', () => {
    const Prop: PropertyDecorator = () => ({});

    class Sample {
      @Prop str: string;
      @Prop num: number;
      @Prop bool: boolean;
      @Prop bigint: bigint;
      @Prop symbol: symbol;
    }

    expect(getPropType(Sample.prototype, 'str')).toBe(String);
    expect(getPropType(Sample.prototype, 'num')).toBe(Number);
    expect(getPropType(Sample.prototype, 'bool')).toBe(Boolean);
    expect(getPropType(Sample.prototype, 'bigint')).toBe(BigInt);
    expect(getPropType(Sample.prototype, 'symbol')).toBe(Symbol);
  });

  it('should get class property types', () => {
    const Prop: PropertyDecorator = () => ({});

    class Other {}

    class Sample {
      @Prop date: Date;
      @Prop other: Other;
      @Prop buffer: Buffer;
    }

    expect(getPropType(Sample.prototype, 'date')).toBe(Date);
    expect(getPropType(Sample.prototype, 'other')).toBe(Other);
    expect(getPropType(Sample.prototype, 'buffer')).toBe(Buffer);
  });

  it('should get array class types', () => {
    const Prop: PropertyDecorator = () => ({});

    class Other {}

    class OtherArray extends Array<Other> {}
    class StringArray extends Array<string> {}

    class Sample {
      @Prop others: OtherArray;
      @Prop strings: StringArray;
      @Prop normal: string[];
    }

    expect(getPropType(Sample.prototype, 'others')).toBe(OtherArray);
    expect(getPropType(Sample.prototype, 'strings')).toBe(StringArray);

    // TypeScript emits Array for normal array types.
    expect(getPropType(Sample.prototype, 'normal')).toBe(Array);
  });

  it('should get inherited property metadata', () => {
    const Prop: PropertyDecorator = () => ({});

    class Base {
      @Prop name: string;
    }

    class Sample extends Base {}

    expect(getPropType(Sample.prototype, 'name')).toBe(String);
  });

  it('should get metadata from the subclass for subclass properties', () => {
    const Prop: PropertyDecorator = () => ({});

    class Base {
      @Prop value: string;
    }

    class Sample extends Base {
      @Prop count: number;
    }

    expect(getPropType(Sample.prototype, 'value')).toBe(String);
    expect(getPropType(Sample.prototype, 'count')).toBe(Number);
  });

  it('should return undefined when metadata does not exist', () => {
    class Sample {
      name!: string;
    }

    expect(getPropType(Sample.prototype, 'name')).toBeUndefined();
  });

  it('should support symbol property keys', () => {
    const Prop: PropertyDecorator = () => ({});
    const key = Symbol('name');

    class Sample {
      @Prop [key]: string;
    }

    expect(getPropType(Sample.prototype, key)).toBe(String);
  });
});
