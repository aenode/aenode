import 'reflect-metadata';

import type { PropValidationOptions } from '@aenode/prop-options';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('BooleanValidation', () => {
  describe('Valid', () => {
    it.each`
      options                        | value
      ${{} as PropValidationOptions} | ${{ value: undefined }}
      ${{} as PropValidationOptions} | ${{ value: null }}
      ${{} as PropValidationOptions} | ${{ value: true }}
      ${{} as PropValidationOptions} | ${{ value: false }}
      ${{} as PropValidationOptions} | ${{ value: 'true' }}
      ${{} as PropValidationOptions} | ${{ value: 'false' }}
    `('$options with $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: number;
      }
      const errors = transformAndValidate(Sample, value);
      expect(errors).toEqual([]);
    });
  });
});
