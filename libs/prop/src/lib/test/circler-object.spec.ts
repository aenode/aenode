import { transformAndValidate } from '../test-helpers.js';
import { Parent } from './parent.js';

describe('Object Circler', () => {
  it('should validate', () => {
    const constraints = transformAndValidate(Parent, {
      child: { name: 'some' },
    });

    expect(constraints).toEqual([]);
  });
});
