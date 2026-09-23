import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Boolean Array Validation', () => {
  it.each`
    options                                             | value                      | errors
    ${{ type: Boolean } as PropOptions}                 | ${{ value: undefined }}    | ${[]}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: null }}         | ${[]}
    ${{ type: Boolean, required: true } as PropOptions} | ${{ value: [undefined] }}  | ${['isDefined', 'isBoolean']}
    ${{ type: Boolean, required: true } as PropOptions} | ${{ value: [null] }}       | ${['isDefined', 'isBoolean']}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: [true] }}       | ${[]}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: [false] }}      | ${[]}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: [1] }}          | ${['isBoolean']}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: [''] }}         | ${['isBoolean']}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: [new Date()] }} | ${['isBoolean']}
    ${{ type: Boolean } as PropOptions}                 | ${{ value: [{}] }}         | ${['isBoolean']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: boolean[];
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
