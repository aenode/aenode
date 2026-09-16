import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { PropValidationOptions as O } from './prop-options.js';
import { PropValidation } from './prop.js';

describe('String', () => {
  describe('Valid string', () => {
    it.each`
      options                  | value
      ${{} as O}               | ${{ param: undefined }}
      ${{} as O}               | ${{ param: null }}
      ${{} as O}               | ${{ param: '' }}
      ${{ minLength: 3 } as O} | ${{ param: '123' }}
      ${{ maxLength: 5 } as O} | ${{ param: '1234' }}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @PropValidation(options) param: string;
      }

      const instance = plainToInstance(Sample, value, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
        exposeDefaultValues: true,
      });

      const foundErrors = validateSync(instance);

      expect(foundErrors.length).toEqual(0);
    });
  });

  describe('Invalid string', () => {
    it.each`
      options                    | value                   | errors
      ${{ required: true } as O} | ${{ param: undefined }} | ${['isDefined', 'isString']}
      ${{ required: true } as O} | ${{ param: null }}      | ${['isDefined', 'isString']}
      ${{ minLength: 4 } as O}   | ${{ param: '123' }}     | ${['minLength']}
      ${{ maxLength: 3 } as O}   | ${{ param: '1234' }}    | ${['maxLength']}
    `('should validate $value with $options', ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) param: string;
      }

      const instance = plainToInstance(Sample, value, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
        exposeDefaultValues: true,
      });

      const foundErrors = validateSync(instance);
      const cons = foundErrors
        .flatMap((e) => Object.keys(e.constraints ?? {}))
        .filter((e) => e);

      expect(cons).toEqual(errors);
    });
  });
});
