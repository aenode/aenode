import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { PropOptions as O } from './prop-options.js';
import { Prop } from './prop.js';

describe('date', () => {
  describe('Valid date', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ pram: undefined }}
      ${{} as O} | ${{ pram: null }}
      ${{} as O} | ${{ pram: new Date() }}
      ${{} as O} | ${{ pram: new Date().toISOString() }}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop(options) pram: Date;
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

  describe('Invalid date', () => {
    it.each`
      options                    | value                                  | errors
      ${{ required: true } as O} | ${{ pram: undefined }}                 | ${['isDefined', 'isDate']}
      ${{ required: true } as O} | ${{ pram: null }}                      | ${['isDefined', 'isDate']}
      ${{} as O}                 | ${{ pram: 3 }}                         | ${['isDate']}
      ${{} as O}                 | ${{ pram: 'true' }}                    | ${['isDate']}
      ${{} as O}                 | ${{ pram: 'false' }}                   | ${['isDate']}
      ${{} as O}                 | ${{ pram: new Date().toString() }}     | ${['isDate']}
      ${{} as O}                 | ${{ pram: new Date().toDateString() }} | ${['isDate']}
    `('should validate $value with $options', ({ options, value, errors }) => {
      class Sample {
        @Prop(options) pram: Date;
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
