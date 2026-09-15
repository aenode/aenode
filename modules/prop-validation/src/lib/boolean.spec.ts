import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { PropOptions as O } from './prop-options.js';
import { Prop } from './prop.js';

describe('boolean', () => {
  describe('Valid boolean', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ pram: undefined }}
      ${{} as O} | ${{ pram: null }}
      ${{} as O} | ${{ pram: true }}
      ${{} as O} | ${{ pram: false }}
      ${{} as O} | ${{ pram: 'false' }}
      ${{} as O} | ${{ pram: 'true' }}
      ${{} as O} | ${{ pram: 'False' }}
      ${{} as O} | ${{ pram: 'True' }}
      ${{} as O} | ${{ pram: '1' }}
      ${{} as O} | ${{ pram: '0' }}
      ${{} as O} | ${{ pram: '-1' }}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop(options) pram: boolean;
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

  describe('Invalid boolean', () => {
    it.each`
      options                    | value                  | errors
      ${{ required: true } as O} | ${{ pram: undefined }} | ${['isDefined', 'isBoolean']}
      ${{ required: true } as O} | ${{ pram: null }}      | ${['isDefined', 'isBoolean']}
      ${{} as O}                 | ${{ pram: 3 }}         | ${['isBoolean']}
      ${{} as O}                 | ${{ pram: 'some' }}    | ${['isBoolean']}
    `('should validate $value with $options', ({ options, value, errors }) => {
      class Sample {
        @Prop(options) pram: boolean;
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
