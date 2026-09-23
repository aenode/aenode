import { faker } from '@faker-js/faker';
import 'reflect-metadata';
import { v4, v7 } from 'uuid';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('String Array Validation ', () => {
  it.each`
    options                                                | value                                                               | errors
    ${{ type: String } as PropOptions}                     | ${{ value: undefined }}                                             | ${[]}
    ${{ type: String } as PropOptions}                     | ${{ value: null }}                                                  | ${[]}
    ${{ type: String, required: true } as PropOptions}     | ${{ value: undefined }}                                             | ${['isString', 'isArray', 'isDefined']}
    ${{ type: String, required: true } as PropOptions}     | ${{ value: null }}                                                  | ${['isString', 'isArray', 'isDefined']}
    ${{ type: String, required: true } as PropOptions}     | ${{ value: [undefined] }}                                           | ${['isString', 'isDefined']}
    ${{ type: String, required: true } as PropOptions}     | ${{ value: [null] }}                                                | ${['isString', 'isDefined']}
    ${{ type: String } as PropOptions}                     | ${{ value: [''] }}                                                  | ${[]}
    ${{ type: String } as PropOptions}                     | ${{ value: [' '] }}                                                 | ${[]}
    ${{ type: String, minLength: 5 } as PropOptions}       | ${{ value: [faker.string.sample(5)] }}                              | ${[]}
    ${{ type: String, maxLength: 5 } as PropOptions}       | ${{ value: [faker.string.sample(5)] }}                              | ${[]}
    ${{ type: String, format: 'password' } as PropOptions} | ${{ value: ['!Password123.'] }}                                     | ${[]}
    ${{ type: String, format: 'email' } as PropOptions}    | ${{ value: [faker.internet.email()] }}                              | ${[]}
    ${{ type: String, format: 'uuid' } as PropOptions}     | ${{ value: [v4()] }}                                                | ${[]}
    ${{ type: String, format: 'uuid4' } as PropOptions}    | ${{ value: [v4()] }}                                                | ${[]}
    ${{ type: String, format: 'uuid7' } as PropOptions}    | ${{ value: [v7()] }}                                                | ${[]}
    ${{ type: String, format: 'url' } as PropOptions}      | ${{ value: [faker.internet.url()] }}                                | ${[]}
    ${{ type: String, format: 'data-uri' } as PropOptions} | ${{ value: [faker.image.dataUri()] }}                               | ${[]}
    ${{ type: String, format: 'ean' } as PropOptions}      | ${{ value: [faker.commerce.isbn({ variant: 13, separator: '' })] }} | ${[]}
    ${{ type: String, format: 'password' } as PropOptions} | ${{ value: ['some'] }}                                              | ${['isStrongPassword']}
    ${{ type: String, format: 'email' } as PropOptions}    | ${{ value: ['some'] }}                                              | ${['isEmail']}
    ${{ type: String, format: 'uuid' } as PropOptions}     | ${{ value: ['some'] }}                                              | ${['isUuid']}
    ${{ type: String, format: 'uuid4' } as PropOptions}    | ${{ value: ['some'] }}                                              | ${['isUuid']}
    ${{ type: String, format: 'uuid7' } as PropOptions}    | ${{ value: ['some'] }}                                              | ${['isUuid']}
    ${{ type: String, format: 'url' } as PropOptions}      | ${{ value: ['some'] }}                                              | ${['isUrl']}
    ${{ type: String, format: 'data-uri' } as PropOptions} | ${{ value: ['some'] }}                                              | ${['isDataURI']}
    ${{ type: String, format: 'ean' } as PropOptions}      | ${{ value: ['some'] }}                                              | ${['isEAN']}
    ${{ type: String, minLength: 5 } as PropOptions}       | ${{ value: [faker.string.sample(4)] }}                              | ${['minLength']}
    ${{ type: String, maxLength: 5 } as PropOptions}       | ${{ value: [faker.string.sample(6)] }}                              | ${['maxLength']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: string[];
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
