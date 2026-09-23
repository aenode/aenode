import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Boolean Validation', () => {
  it.each`
    options                              | value                      | errors
    ${{} as PropOptions}                 | ${{ value: undefined }}    | ${[]}
    ${{} as PropOptions}                 | ${{ value: null }}         | ${[]}
    ${{ required: true } as PropOptions} | ${{ value: undefined }}    | ${['isDefined']}
    ${{ required: true } as PropOptions} | ${{ value: null }}         | ${['isDefined', 'nestedValidation']}
    ${{} as PropOptions}                 | ${{ value: { name: '' } }} | ${[]}
    ${{} as PropOptions}                 | ${{ value: { name: '' } }} | ${[]}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Obj {
        @PropValidation() name: string;
      }
      class Sample {
        @PropValidation(options) value: Obj;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
