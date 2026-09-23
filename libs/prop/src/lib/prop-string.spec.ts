import { faker } from '@faker-js/faker';
import 'reflect-metadata';
import { v4, v7 } from 'uuid';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

describe('String Value Validation', () => {
  it.each`
    options                                            | value                                                             | errors
    ${{} as PropValidationOptions}                     | ${{ value: undefined }}                                           | ${[]}
    ${{} as PropValidationOptions}                     | ${{ value: null }}                                                | ${[]}
    ${{ required: true } as PropValidationOptions}     | ${{ value: undefined }}                                           | ${['isString', 'isDefined']}
    ${{ required: true } as PropValidationOptions}     | ${{ value: null }}                                                | ${['isString', 'isDefined']}
    ${{} as PropValidationOptions}                     | ${{ value: '' }}                                                  | ${[]}
    ${{} as PropValidationOptions}                     | ${{ value: ' ' }}                                                 | ${[]}
    ${{ minLength: 5 } as PropValidationOptions}       | ${{ value: faker.string.sample(5) }}                              | ${[]}
    ${{ maxLength: 5 } as PropValidationOptions}       | ${{ value: faker.string.sample(5) }}                              | ${[]}
    ${{ format: 'password' } as PropValidationOptions} | ${{ value: '!Password123.' }}                                     | ${[]}
    ${{ format: 'email' } as PropValidationOptions}    | ${{ value: faker.internet.email() }}                              | ${[]}
    ${{ format: 'uuid' } as PropValidationOptions}     | ${{ value: v4() }}                                                | ${[]}
    ${{ format: 'uuid4' } as PropValidationOptions}    | ${{ value: v4() }}                                                | ${[]}
    ${{ format: 'uuid7' } as PropValidationOptions}    | ${{ value: v7() }}                                                | ${[]}
    ${{ format: 'url' } as PropValidationOptions}      | ${{ value: faker.internet.url() }}                                | ${[]}
    ${{ format: 'data-uri' } as PropValidationOptions} | ${{ value: faker.image.dataUri() }}                               | ${[]}
    ${{ format: 'ean' } as PropValidationOptions}      | ${{ value: faker.commerce.isbn({ variant: 13, separator: '' }) }} | ${[]}
    ${{} as PropValidationOptions}                     | ${{ value: 1 }}                                                   | ${['isString']}
    ${{} as PropValidationOptions}                     | ${{ value: true }}                                                | ${['isString']}
    ${{} as PropValidationOptions}                     | ${{ value: {} }}                                                  | ${['isString']}
    ${{} as PropValidationOptions}                     | ${{ value: [] }}                                                  | ${['isString']}
    ${{ format: 'password' } as PropValidationOptions} | ${{ value: 'some' }}                                              | ${['isStrongPassword']}
    ${{ format: 'email' } as PropValidationOptions}    | ${{ value: 'some' }}                                              | ${['isEmail']}
    ${{ format: 'uuid' } as PropValidationOptions}     | ${{ value: 'some' }}                                              | ${['isUuid']}
    ${{ format: 'uuid4' } as PropValidationOptions}    | ${{ value: 'some' }}                                              | ${['isUuid']}
    ${{ format: 'uuid7' } as PropValidationOptions}    | ${{ value: 'some' }}                                              | ${['isUuid']}
    ${{ format: 'url' } as PropValidationOptions}      | ${{ value: 'some' }}                                              | ${['isUrl']}
    ${{ format: 'data-uri' } as PropValidationOptions} | ${{ value: 'some' }}                                              | ${['isDataURI']}
    ${{ format: 'ean' } as PropValidationOptions}      | ${{ value: 'some' }}                                              | ${['isEAN']}
    ${{ minLength: 5 } as PropValidationOptions}       | ${{ value: faker.string.sample(4) }}                              | ${['minLength']}
    ${{ maxLength: 5 } as PropValidationOptions}       | ${{ value: faker.string.sample(6) }}                              | ${['maxLength']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: string;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
