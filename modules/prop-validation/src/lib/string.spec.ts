import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { PropOptions as O } from './prop-options.js';
import { Prop } from './prop.js';

describe('String', () => {
  describe('Valid string', () => {
    it.each`
      options                  | value
      ${{} as O}               | ${{ name: undefined }}
      ${{} as O}               | ${{ name: null }}
      ${{} as O}               | ${{ name: '' }}
      ${{ minLength: 3 } as O} | ${{ name: '123' }}
      ${{ maxLength: 5 } as O} | ${{ name: '1234' }}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop(options) name: string;
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
      options                    | value                  | errors
      ${{ required: true } as O} | ${{ name: undefined }} | ${['isDefined', 'isString']}
      ${{ required: true } as O} | ${{ name: null }}      | ${['isDefined', 'isString']}
      ${{ minLength: 4 } as O}   | ${{ name: '123' }}     | ${['minLength']}
      ${{ maxLength: 3 } as O}   | ${{ name: '1234' }}    | ${['maxLength']}
    `('should validate $value with $options', ({ options, value, errors }) => {
      class Sample {
        @Prop(options) name: string;
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
