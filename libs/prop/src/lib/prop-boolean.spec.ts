import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Boolean Validation', () => {
  it.each`
    options                              | value                    | errors
    ${{} as PropOptions}                 | ${{ value: undefined }}  | ${[]}
    ${{} as PropOptions}                 | ${{ value: null }}       | ${[]}
    ${{ required: true } as PropOptions} | ${{ value: undefined }}  | ${['isDefined', 'isBoolean']}
    ${{ required: true } as PropOptions} | ${{ value: null }}       | ${['isDefined', 'isBoolean']}
    ${{} as PropOptions}                 | ${{ value: true }}       | ${[]}
    ${{} as PropOptions}                 | ${{ value: false }}      | ${[]}
    ${{} as PropOptions}                 | ${{ value: 1 }}          | ${['isBoolean']}
    ${{} as PropOptions}                 | ${{ value: '' }}         | ${['isBoolean']}
    ${{} as PropOptions}                 | ${{ value: new Date() }} | ${['isBoolean']}
    ${{} as PropOptions}                 | ${{ value: {} }}         | ${['isBoolean']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: boolean;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
