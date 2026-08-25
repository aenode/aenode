import 'reflect-metadata';

import type { PropValidationOptions } from '@aenode/prop-options';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('DateValidation', () => {
  describe('Valid', () => {
    it.each`
      options                        | value
      ${{} as PropValidationOptions} | ${{ value: undefined }}
      ${{} as PropValidationOptions} | ${{ value: null }}
      ${{} as PropValidationOptions} | ${{ value: new Date() }}
      ${{} as PropValidationOptions} | ${{ value: new Date().toISOString() }}
    `('$options with $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: Date;
      }
      const errors = transformAndValidate(Sample, value);
      expect(errors).toEqual([]);
    });
  });
});
