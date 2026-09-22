import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';

describe('Number Array Validation', () => {
  it.each`
    options                                               | value                   | errors
    ${{ type: Number } as PropOptions}                    | ${{ value: undefined }} | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: null }}      | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: [1] }}       | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: [-1] }}      | ${[]}
    ${{ type: Number, format: 'percent' } as PropOptions} | ${{ value: [0] }}       | ${[]}
    ${{ type: Number, format: 'integer' } as PropOptions} | ${{ value: [0] }}       | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: [0] }}       | ${[]}
    ${{ type: Number, min: 5 } as PropOptions}            | ${{ value: [4] }}       | ${['min']}
    ${{ type: Number, max: 5 } as PropOptions}            | ${{ value: [6] }}       | ${['max']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: number[];
      }

      const instance = plainToInstance(Sample, value, {
        excludeExtraneousValues: true,
      });
      const foundErrors = validateSync(instance, {});

      const foundConstraints = foundErrors
        .flatMap((e) => [e, ...(e.children ?? [])])
        .flatMap((e) => {
          return Object.keys(e.constraints ?? {});
        });
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
