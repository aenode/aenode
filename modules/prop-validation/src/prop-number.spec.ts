import 'reflect-metadata';

import type { PropValidationOptions } from '@aenode/prop-options';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('NumberValidation', () => {
  describe('Valid', () => {
    it.each`
      options                        | value
      ${{} as PropValidationOptions} | ${{ value: undefined }}
      ${{} as PropValidationOptions} | ${{ value: null }}
      ${{} as PropValidationOptions} | ${{ value: '1' }}
      ${{} as PropValidationOptions} | ${{ value: Number('1') }}
      ${{} as PropValidationOptions} | ${{ value: Number.MAX_SAFE_INTEGER }}
      ${{} as PropValidationOptions} | ${{ value: Number.MIN_SAFE_INTEGER }}
    `('$options with $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: number;
      }
      const errors = transformAndValidate(Sample, value);
      expect(errors).toEqual([]);
    });
  });
});
