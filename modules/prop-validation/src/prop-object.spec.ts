import 'reflect-metadata';

import type { PropValidationOptions } from '@aenode/prop-options';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('ObjectValidation', () => {
  describe('Valid', () => {
    it.each`
      options                        | value
      ${{} as PropValidationOptions} | ${{ value: undefined }}
      ${{} as PropValidationOptions} | ${{ value: null }}
      ${{} as PropValidationOptions} | ${{ value: { name: undefined } }}
      ${{} as PropValidationOptions} | ${{ value: { name: null } }}
      ${{} as PropValidationOptions} | ${{ value: { name: 'some' } }}
      ${{} as PropValidationOptions} | ${{ value: { name: 'some' } }}
    `('$options with $value', ({ options, value }) => {
      class SubSample {
        @PropValidation() name: string;
      }

      class Sample {
        @PropValidation({ ...options, type: () => SubSample }) value: SubSample;
      }
      const errors = transformAndValidate(Sample, value);
      expect(errors).toEqual([]);
    });
  });
});
