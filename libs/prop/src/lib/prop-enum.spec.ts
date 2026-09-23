import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

enum ValueEnum {
  First = 'First',
  Second = 'Second',
}

describe('Enum Validation', () => {
  it.each`
    options                                                         | value                    | errors
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: undefined }}  | ${[]}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: null }}       | ${[]}
    ${{ enum: ValueEnum, required: true } as PropValidationOptions} | ${{ value: undefined }}  | ${['isDefined', 'isEnum']}
    ${{ enum: ValueEnum, required: true } as PropValidationOptions} | ${{ value: null }}       | ${['isDefined', 'isEnum']}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: true }}       | ${['isEnum']}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: false }}      | ${['isEnum']}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: 1 }}          | ${['isEnum']}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: '' }}         | ${['isEnum']}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: new Date() }} | ${['isEnum']}
    ${{ enum: ValueEnum } as PropValidationOptions}                 | ${{ value: {} }}         | ${['isEnum']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: ValueEnum;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
