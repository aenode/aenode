import { transformAndValidateSyncTest } from './common/transform-and-validate.js';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';

describe('Date Validation', () => {
  it.each`
    options                                                               | value                                | errors
    ${{} as PropValidationOptions}                                        | ${{ value: undefined }}              | ${[]}
    ${{} as PropValidationOptions}                                        | ${{ value: null }}                   | ${[]}
    ${{ required: true } as PropValidationOptions}                        | ${{ value: undefined }}              | ${['isDate']}
    ${{ required: true } as PropValidationOptions}                        | ${{ value: null }}                   | ${['isDate']}
    ${{} as PropValidationOptions}                                        | ${{ value: new Date() }}             | ${[]}
    ${{ minDate: () => new Date('10/10/1990') } as PropValidationOptions} | ${{ value: new Date('10/9/1990') }}  | ${['minDate']}
    ${{ maxDate: () => new Date('10/10/1990') } as PropValidationOptions} | ${{ value: new Date('10/11/1990') }} | ${['maxDate']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: Date;
      }

      const foundConstraints = transformAndValidateSyncTest(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
