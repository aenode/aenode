import 'reflect-metadata';

import type { PropValidationOptions } from '@aenode/prop-options';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('StringValidation', () => {
  describe('Valid', () => {
    it.each`
      options                                      | value
      ${{} as PropValidationOptions}               | ${{ name: undefined }}
      ${{} as PropValidationOptions}               | ${{ name: null }}
      ${{} as PropValidationOptions}               | ${{ name: '' }}
      ${{} as PropValidationOptions}               | ${{ name: 'some' }}
      ${{} as PropValidationOptions}               | ${{ name: String('Some') }}
      ${{} as PropValidationOptions}               | ${{ name: ' ' }}
      ${{ minLength: 3 } as PropValidationOptions} | ${{ name: '123' }}
      ${{ maxLength: 3 } as PropValidationOptions} | ${{ name: '123' }}
    `('$options with $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) name: string;
      }
      const errors = transformAndValidate(Sample, value);
      expect(errors).toEqual([]);
    });
  });
});
