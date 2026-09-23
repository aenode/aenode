import { faker } from '@faker-js/faker';
import 'reflect-metadata';
import { v4, v7 } from 'uuid';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('String Value Validation', () => {
  it.each`
    options                                  | value                                                             | errors
    ${{} as PropOptions}                     | ${{ value: undefined }}                                           | ${[]}
    ${{} as PropOptions}                     | ${{ value: null }}                                                | ${[]}
    ${{ required: true } as PropOptions}     | ${{ value: undefined }}                                           | ${['isString', 'isDefined']}
    ${{ required: true } as PropOptions}     | ${{ value: null }}                                                | ${['isString', 'isDefined']}
    ${{} as PropOptions}                     | ${{ value: '' }}                                                  | ${[]}
    ${{} as PropOptions}                     | ${{ value: ' ' }}                                                 | ${[]}
    ${{ minLength: 5 } as PropOptions}       | ${{ value: faker.string.sample(5) }}                              | ${[]}
    ${{ maxLength: 5 } as PropOptions}       | ${{ value: faker.string.sample(5) }}                              | ${[]}
    ${{ format: 'password' } as PropOptions} | ${{ value: '!Password123.' }}                                     | ${[]}
    ${{ format: 'email' } as PropOptions}    | ${{ value: faker.internet.email() }}                              | ${[]}
    ${{ format: 'uuid' } as PropOptions}     | ${{ value: v4() }}                                                | ${[]}
    ${{ format: 'uuid4' } as PropOptions}    | ${{ value: v4() }}                                                | ${[]}
    ${{ format: 'uuid7' } as PropOptions}    | ${{ value: v7() }}                                                | ${[]}
    ${{ format: 'url' } as PropOptions}      | ${{ value: faker.internet.url() }}                                | ${[]}
    ${{ format: 'data-uri' } as PropOptions} | ${{ value: faker.image.dataUri() }}                               | ${[]}
    ${{ format: 'ean' } as PropOptions}      | ${{ value: faker.commerce.isbn({ variant: 13, separator: '' }) }} | ${[]}
    ${{} as PropOptions}                     | ${{ value: 1 }}                                                   | ${['isString']}
    ${{} as PropOptions}                     | ${{ value: true }}                                                | ${['isString']}
    ${{} as PropOptions}                     | ${{ value: {} }}                                                  | ${['isString']}
    ${{} as PropOptions}                     | ${{ value: [] }}                                                  | ${['isString']}
    ${{ format: 'password' } as PropOptions} | ${{ value: 'some' }}                                              | ${['isStrongPassword']}
    ${{ format: 'email' } as PropOptions}    | ${{ value: 'some' }}                                              | ${['isEmail']}
    ${{ format: 'uuid' } as PropOptions}     | ${{ value: 'some' }}                                              | ${['isUuid']}
    ${{ format: 'uuid4' } as PropOptions}    | ${{ value: 'some' }}                                              | ${['isUuid']}
    ${{ format: 'uuid7' } as PropOptions}    | ${{ value: 'some' }}                                              | ${['isUuid']}
    ${{ format: 'url' } as PropOptions}      | ${{ value: 'some' }}                                              | ${['isUrl']}
    ${{ format: 'data-uri' } as PropOptions} | ${{ value: 'some' }}                                              | ${['isDataURI']}
    ${{ format: 'ean' } as PropOptions}      | ${{ value: 'some' }}                                              | ${['isEAN']}
    ${{ minLength: 5 } as PropOptions}       | ${{ value: faker.string.sample(4) }}                              | ${['minLength']}
    ${{ maxLength: 5 } as PropOptions}       | ${{ value: faker.string.sample(6) }}                              | ${['maxLength']}
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
