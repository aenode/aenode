import { transformAndValidateSyncTest } from './common/transform-and-validate.js';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';

describe('Date Array Validation', () => {
  it.each`
    options                                                                           | value                                  | errors
    ${{ type: Date } as PropValidationOptions}                                        | ${{ value: undefined }}                | ${[]}
    ${{ type: Date } as PropValidationOptions}                                        | ${{ value: null }}                     | ${[]}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: undefined }}                | ${['isDate', 'isArray']}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: null }}                     | ${['isDate', 'isArray']}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: [undefined] }}              | ${['isDate']}
    ${{ type: Date, required: true } as PropValidationOptions}                        | ${{ value: [null] }}                   | ${['isDate']}
    ${{ type: Date } as PropValidationOptions}                                        | ${{ value: [new Date()] }}             | ${[]}
    ${{ type: Date, minDate: () => new Date('10/10/1990') } as PropValidationOptions} | ${{ value: [new Date('10/9/1990')] }}  | ${['minDate']}
    ${{ type: Date, maxDate: () => new Date('10/10/1990') } as PropValidationOptions} | ${{ value: [new Date('10/11/1990')] }} | ${['maxDate']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: Date[];
      }

      const foundConstraints = transformAndValidateSyncTest(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
