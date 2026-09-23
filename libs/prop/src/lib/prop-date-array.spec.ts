import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Date Array Validation', () => {
  it.each`
    options                                                             | value                                  | errors
    ${{ type: Date } as PropOptions}                                    | ${{ value: undefined }}                | ${[]}
    ${{ type: Date } as PropOptions}                                    | ${{ value: null }}                     | ${[]}
    ${{ type: Date, required: true } as PropOptions}                    | ${{ value: undefined }}                | ${['isDefined', 'isDate', 'isArray']}
    ${{ type: Date, required: true } as PropOptions}                    | ${{ value: null }}                     | ${['isDefined', 'isDate', 'isArray']}
    ${{ type: Date, required: true } as PropOptions}                    | ${{ value: [undefined] }}              | ${['isDefined', 'isDate']}
    ${{ type: Date, required: true } as PropOptions}                    | ${{ value: [null] }}                   | ${['isDefined', 'isDate']}
    ${{ type: Date } as PropOptions}                                    | ${{ value: [new Date()] }}             | ${[]}
    ${{ type: Date, min: () => new Date('10/10/1990') } as PropOptions} | ${{ value: [new Date('10/9/1990')] }}  | ${['minDate']}
    ${{ type: Date, max: () => new Date('10/10/1990') } as PropOptions} | ${{ value: [new Date('10/11/1990')] }} | ${['maxDate']}
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
