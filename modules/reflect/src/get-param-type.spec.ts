/* eslint-disable @typescript-eslint/no-unused-vars */
import { getParamType, getReturnType } from './reflect.js';

/* eslint-disable @typescript-eslint/no-empty-function */
describe('getParamTypes', () => {
  it('should get parameter types', () => {
    const Method: MethodDecorator = () => ({});

    class Other {}

    class Sample {
      @Method
      method(
        _strin: string,
        _numbe: number,
        _boolea: boolean,
        _dat: Date,
        _othe: Other,
      ): void {}
    }

    expect(getParamType(Sample.prototype, 'method')).toEqual([
      String,
      Number,
      Boolean,
      Date,
      Other,
    ]);
  });

  it('should return an empty array for a method with no parameters', () => {
    const Method: MethodDecorator = () => ({});

    class Sample {
      @Method
      method(): void {}
    }

    expect(getParamType(Sample.prototype, 'method')).toEqual([]);
  });

  it('should get inherited method parameter metadata', () => {
    const Method: MethodDecorator = () => ({});

    class Base {
      @Method
      find(_str: string, _num: number): void {}
    }

    class Sample extends Base {}

    expect(getParamType(Sample.prototype, 'find')).toEqual([String, Number]);
  });

  it('should get parameter metadata from subclass methods', () => {
    const Method: MethodDecorator = () => ({});

    class Base {
      @Method
      find(_value: string): void {}
    }

    class Sample extends Base {
      @Method
      create(_value: string, _value0: number): void {}
    }

    expect(getParamType(Sample.prototype, 'find')).toEqual([String]);

    expect(getParamType(Sample.prototype, 'create')).toEqual([String, Number]);
  });

  it('should return undefined when metadata does not exist', () => {
    class Sample {
      method(): void {}
    }

    expect(getParamType(Sample.prototype, 'method')).toBeUndefined();
  });

  it('should support symbol method names', () => {
    const Method: MethodDecorator = () => ({});
    const key = Symbol('method');

    class Sample {
      @Method
      [key](_value: string): void {}
    }

    expect(getParamType(Sample.prototype, key)).toEqual([String]);
  });

  it('should preserve the runtime constructor for class parameters', () => {
    const Method: MethodDecorator = () => ({});

    class User {}

    class Sample {
      @Method
      create(user: User): User {
        return user;
      }
    }

    expect(getParamType(Sample.prototype, 'create')).toEqual([User]);

    expect(getReturnType(Sample.prototype, 'create')).toBe(User);
  });

  it('should expose TypeScript metadata limitations', () => {
    const Method: MethodDecorator = () => ({});

    class Sample {
      @Method
      method(value: string | number): string | number {
        return value;
      }
    }

    // TypeScript does not preserve the complete static type.
    // Runtime metadata is reduced to constructors.
    expect(getParamType(Sample.prototype, 'method')[0]).toEqual(Object);
  });
});
