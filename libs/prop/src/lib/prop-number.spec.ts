import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';

describe('Number Validation', () => {
  it.each`
    options                                 | value                   | errors
    ${{} as PropOptions}                    | ${{ value: undefined }} | ${[]}
    ${{} as PropOptions}                    | ${{ value: null }}      | ${[]}
    ${{} as PropOptions}                    | ${{ value: 1 }}         | ${[]}
    ${{} as PropOptions}                    | ${{ value: -1 }}        | ${[]}
    ${{ format: 'percent' } as PropOptions} | ${{ value: 0 }}         | ${[]}
    ${{ format: 'integer' } as PropOptions} | ${{ value: 0 }}         | ${[]}
    ${{} as PropOptions}                    | ${{ value: 0 }}         | ${[]}
    ${{ min: 5 } as PropOptions}            | ${{ value: 4 }}         | ${['min']}
    ${{ max: 5 } as PropOptions}            | ${{ value: 6 }}         | ${['max']}
    ${{ format: 'percent' } as PropOptions} | ${{ value: 0 }}         | ${[]}
    ${{ format: 'integer' } as PropOptions} | ${{ value: 0.12 }}      | ${['isInt']}
    ${{ format: 'percent' } as PropOptions} | ${{ value: -1 }}        | ${['min']}
    ${{ format: 'percent' } as PropOptions} | ${{ value: 101 }}       | ${['max']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: number;
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
