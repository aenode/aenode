import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

describe('Date Array Validation', () => {
  it.each`
    options                                                                           | value                                  | errors
    ${{ type: Date } as PropValidationOptions}                                        | ${{ value: undefined }}                | ${[]}
    ${{ type: Date } as PropValidationOptions}                                        | ${{ value: null }}                     | ${[]}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: undefined }}                | ${['isDefined', 'isDate', 'isArray']}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: null }}                     | ${['isDefined', 'isDate', 'isArray']}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: [undefined] }}              | ${['isDefined', 'isDate']}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: [null] }}                   | ${['isDefined', 'isDate']}
    ${{ type: Date } as PropValidationOptions}                                        | ${{ value: [new Date()] }}             | ${[]}
    ${{ type: Date, minDate: () => new Date('10/10/1990') } as PropValidationOptions} | ${{ value: [new Date('10/9/1990')] }}  | ${['minDate']}
    ${{ type: Date, maxDate: () => new Date('10/10/1990') } as PropValidationOptions} | ${{ value: [new Date('10/11/1990')] }} | ${['maxDate']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: Date[];
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
