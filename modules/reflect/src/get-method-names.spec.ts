/* eslint-disable @typescript-eslint/no-empty-function */
import { getMethodNames } from './reflect.js';

describe('getMethodNames', () => {
  it('should return own method names', () => {
    class Example {
      methodOne() {}

      methodTwo() {}
    }

    expect(getMethodNames(Example)).toEqual(
      expect.arrayContaining(['methodOne', 'methodTwo']),
    );
  });

  it('should exclude the constructor', () => {
    class Example {
      method() {}
    }

    expect(getMethodNames(Example)).not.toContain('constructor');
  });

  it('should not return properties', () => {
    class Example {
      property = 'value';

      method() {}
    }

    const names = getMethodNames(Example);

    expect(names).toContain('method');
    expect(names).not.toContain('property');
  });

  it('should include inherited methods', () => {
    class Parent {
      parentMethod() {}
    }

    class Child extends Parent {
      childMethod() {}
    }

    const names = getMethodNames(Child);

    expect(names).toContain('parentMethod');
    expect(names).toContain('childMethod');
  });

  it('should exclude inherited properties', () => {
    class Parent {
      parentProperty = 'value';

      parentMethod() {}
    }

    class Child extends Parent {
      childProperty = 'value';

      childMethod() {}
    }

    const names = getMethodNames(Child);

    expect(names).toContain('parentMethod');
    expect(names).toContain('childMethod');
    expect(names).not.toContain('parentProperty');
    expect(names).not.toContain('childProperty');
  });

  it('should not include methods from Object.prototype', () => {
    class Example {
      method() {}
    }

    const names = getMethodNames(Example);

    expect(names).not.toContain('toString');
    expect(names).not.toContain('valueOf');
    expect(names).not.toContain('hasOwnProperty');
  });

  it('should return an empty array for a class without methods', () => {
    class Example {
      property = 'value';
    }

    expect(getMethodNames(Example)).toEqual([]);
  });

  it('should return an empty array for an empty class', () => {
    class Example {}

    expect(getMethodNames(Example)).toEqual([]);
  });

  it('should not return getters as methods', () => {
    class Example {
      get name() {
        return 'John';
      }
    }

    expect(getMethodNames(Example)).not.toContain('name');
  });

  it('should not return setters as methods', () => {
    class Example {
      set name(_value: string) {}
    }

    expect(getMethodNames(Example)).not.toContain('name');
  });

  it('should return methods defined at multiple levels of inheritance', () => {
    class GrandParent {
      grandParentMethod() {}
    }

    class Parent extends GrandParent {
      parentMethod() {}
    }

    class Child extends Parent {
      childMethod() {}
    }

    expect(getMethodNames(Child)).toEqual(
      expect.arrayContaining([
        'grandParentMethod',
        'parentMethod',
        'childMethod',
      ]),
    );
  });

  it('should not return duplicate method names', () => {
    class Parent {
      method() {}
    }

    class Child extends Parent {
      override method() {}
    }

    const names = getMethodNames(Child);

    expect(names.filter((name) => name === 'method')).toHaveLength(1);
  });

  it('should return methods from the child before inherited methods', () => {
    class Parent {
      parentMethod() {}
    }

    class Child extends Parent {
      childMethod() {}
    }

    expect(getMethodNames(Child)).toEqual(['childMethod', 'parentMethod']);
  });
});
