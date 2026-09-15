import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { PropOptions as O } from './prop-options.js';
import { Prop } from './prop.js';

describe('number', () => {
  describe('Valid number', () => {
    it.each`
      options            | value
      ${{} as O}         | ${{ pram: undefined }}
      ${{} as O}         | ${{ pram: null }}
      ${{} as O}         | ${{ pram: -1 }}
      ${{} as O}         | ${{ pram: 0 }}
      ${{ min: 3 } as O} | ${{ pram: 3 }}
      ${{ max: 5 } as O} | ${{ pram: 5 }}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop(options) pram: number;
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

  describe('Invalid number', () => {
    it.each`
      options                    | value                  | errors
      ${{ required: true } as O} | ${{ pram: undefined }} | ${['isDefined', 'isNumber']}
      ${{ required: true } as O} | ${{ pram: null }}      | ${['isDefined', 'isNumber']}
      ${{ min: 4 } as O}         | ${{ pram: 3 }}         | ${['min']}
      ${{ max: 3 } as O}         | ${{ pram: 4 }}         | ${['max']}
    `('should validate $value with $options', ({ options, value, errors }) => {
      class Sample {
        @Prop(options) pram: number;
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
