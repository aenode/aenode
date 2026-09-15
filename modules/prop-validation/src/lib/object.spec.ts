import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { PropOptions as O } from './prop-options.js';
import { Prop } from './prop.js';

describe('object', () => {
  describe('Valid object', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ pram: undefined }}
      ${{} as O} | ${{ pram: null }}
      ${{} as O} | ${{ pram: { name: '' } }}
      ${{} as O} | ${{ pram: { name: 'some' } }}
    `('should validate $value with $options', ({ options, value }) => {
      class SubSample {
        @Prop()
        name: string;
      }
      class Sample {
        @Prop(options) pram: SubSample;
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

  describe('Invalid object', () => {
    it.each`
      options                    | value                    | errors
      ${{ required: true } as O} | ${{ pram: undefined }}   | ${['isDefined']}
      ${{ required: true } as O} | ${{ pram: null }}        | ${['isDefined']}
      ${{ required: true } as O} | ${{ pram: { name: 1 } }} | ${['isString']}
    `('should validate $value with $options', ({ options, value, errors }) => {
      class SubSample {
        @Prop()
        name: string;
      }
      class Sample {
        @Prop(options) pram: SubSample;
      }

      const instance = plainToInstance(Sample, value, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
        exposeDefaultValues: true,
      });

      const foundErrors = validateSync(instance);

      const cons = foundErrors
        .flatMap((e) => [e, ...(e.children ?? [])])
        .flatMap((e) => [...Object.keys(e.constraints ?? {})])
        .filter((e) => e);

      expect(cons).toEqual(errors);
    });
  });
});
