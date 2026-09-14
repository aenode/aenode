/* eslint-disable @typescript-eslint/no-empty-function */
import { getPropertyNames } from './reflect.js';

describe('getPropertyNames', () => {
  const Prop: PropertyDecorator = () => ({});

  it('should return decorated properties', () => {
    class Example {
      @Prop
      name: string;

      @Prop
      age: number;
    }

    expect(getPropertyNames(Example)).toEqual(
      expect.arrayContaining(['name', 'age']),
    );
  });

  it('should not return undecorated properties', () => {
    class Example {
      @Prop
      name: string;

      age: number;
    }

    expect(getPropertyNames(Example)).toEqual(['name']);
  });

  it('should exclude methods', () => {
    class Example {
      @Prop
      name: string;

      greet() {
        return 'Hello';
      }
    }

    const names = getPropertyNames(Example);

    expect(names).toContain('name');
    expect(names).not.toContain('greet');
  });

  it('should include decorated properties inherited from parent classes', () => {
    class Parent {
      @Prop
      parentName: string;
    }

    class Child extends Parent {
      @Prop
      childName: string;
    }

    expect(getPropertyNames(Child)).toEqual(
      expect.arrayContaining(['childName', 'parentName']),
    );
  });

  it('should not include undecorated inherited properties', () => {
    class Parent {
      @Prop
      parentName: string;

      ignored: string;
    }

    class Child extends Parent {
      @Prop
      childName: string;
    }

    const names = getPropertyNames(Child);

    expect(names).toContain('parentName');
    expect(names).toContain('childName');
    expect(names).not.toContain('ignored');
  });

  it('should not include the constructor', () => {
    class Example {
      @Prop
      name: string;
    }

    expect(getPropertyNames(Example)).not.toContain('constructor');
  });

  it('should not include Object.prototype properties', () => {
    class Example {
      @Prop
      name: string;
    }

    const names = getPropertyNames(Example);

    expect(names).not.toContain('toString');
    expect(names).not.toContain('valueOf');
    expect(names).not.toContain('hasOwnProperty');
  });

  it('should not return duplicate property names', () => {
    class Parent {
      @Prop
      name: string;
    }

    class Child extends Parent {
      @Prop
      override name: string;
    }

    const names = getPropertyNames(Child);

    expect(names.filter((name) => name === 'name')).toHaveLength(1);
  });

  it('should return an empty array when there are no decorated properties', () => {
    class Example {
      name: string;

      greet() {}
    }

    expect(getPropertyNames(Example)).toEqual([]);
  });
});
