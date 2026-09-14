/* eslint-disable @typescript-eslint/no-empty-function */
import { getReturnType } from './reflect.js';

describe('getReturnType', () => {
  it('should get the return type of a method', () => {
    const Method: MethodDecorator = () => ({});

    class Sample {
      @Method
      stringMethod(): string {
        return '';
      }

      @Method
      numberMethod(): number {
        return 1;
      }

      @Method
      booleanMethod(): boolean {
        return true;
      }

      @Method
      voidMethod(): void {}

      @Method
      dateMethod(): Date {
        return new Date();
      }
    }

    expect(getReturnType(Sample.prototype, 'stringMethod')).toBe(String);

    expect(getReturnType(Sample.prototype, 'numberMethod')).toBe(Number);

    expect(getReturnType(Sample.prototype, 'booleanMethod')).toBe(Boolean);

    expect(getReturnType(Sample.prototype, 'voidMethod')).toBe(
      undefined as unknown as string,
    );

    expect(getReturnType(Sample.prototype, 'dateMethod')).toBe(Date);
  });

  it('should get inherited method metadata', () => {
    const Method: MethodDecorator = () => ({});

    class Base {
      @Method
      find(): string {
        return '';
      }
    }

    class Sample extends Base {}

    expect(getReturnType(Sample.prototype, 'find')).toBe(String);
  });

  it('should get metadata from subclass methods', () => {
    const Method: MethodDecorator = () => ({});

    class Base {
      @Method
      find(): string {
        return '';
      }
    }

    class Sample extends Base {
      @Method
      create(): number {
        return 1;
      }
    }

    expect(getReturnType(Sample.prototype, 'find')).toBe(String);

    expect(getReturnType(Sample.prototype, 'create')).toBe(Number);
  });

  it('should return undefined when metadata does not exist', () => {
    class Sample {
      find(): string {
        return '';
      }
    }

    expect(getReturnType(Sample.prototype, 'find')).toBeUndefined();
  });

  it('should support symbol method names', () => {
    const Method: MethodDecorator = () => ({});
    const key = Symbol('find');

    class Sample {
      @Method
      [key](): string {
        return '';
      }
    }

    expect(getReturnType(Sample.prototype, key)).toBe(String);
  });

  it('should demonstrate that overridden methods can inherit stale metadata', () => {
    const Method: MethodDecorator = () => ({});

    class Base {
      @Method
      find(): string {
        return '';
      }
    }

    class Sample extends Base {
      override find(): number {
        return 1;
      }
    }

    // Reflect.getMetadata() walks the prototype chain.
    // Therefore this finds Base.find's metadata.
    expect(getReturnType(Sample.prototype, 'find')).toBe(String);
  });
});
