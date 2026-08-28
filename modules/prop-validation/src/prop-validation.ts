import 'reflect-metadata';
//
import { EqualMatcher, PropertyMathcer } from '@aenode/flow';
import { isDefined } from '@aenode/is';
import type { PropFormat, PropValidationOptions } from '@aenode/prop-options';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsAscii,
  IsBase32,
  IsBase58,
  IsBase64,
  IsBIC,
  IsBooleanString,
  IsBtcAddress,
  IsCreditCard,
  IsCurrency,
  IsDataURI,
  IsDefined,
  IsEAN,
  IsEmail,
  IsEnum,
  IsFQDN,
  IsHash,
  IsHSL,
  IsIBAN,
  IsIn,
  IsISBN,
  IsISO8601,
  IsJSON,
  IsJWT,
  IsNotIn,
  IsOptional,
  IsPassportNumber,
  IsPhoneNumber,
  IsSemVer,
  IsStrongPassword,
  IsUUID,
  Matches,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinDate,
  MinLength,
  ValidateNested,
  type ValidationOptions,
} from 'class-validator';

export type { PropValidationOptions } from '@aenode/prop-options';

export function PropFormatValidation(
  format: string,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;

    const collectedDecorator = new EqualMatcher<PropertyDecorator, PropFormat>(
      format as PropFormat,
    )
      .isEqualTo('email', () => IsEmail(undefined, vo))
      .isEqualTo('password', () => IsStrongPassword(undefined, vo))
      .isEqualTo('uuid', () => IsUUID('all', vo))
      .isEqualTo('alpha', () => IsAlpha(undefined, vo))
      .isEqualTo('alphanumeric', () => IsAlphanumeric(undefined, vo))
      .isEqualTo('ascii', () => IsAscii(vo))
      .isEqualTo('base32', () => IsBase32(vo))
      .isEqualTo('base58', () => IsBase58(vo))
      .isEqualTo('base64', () => IsBase64({ urlSafe: true }, vo))
      .isEqualTo('bic', () => IsBIC(vo))
      .isEqualTo('boolean', () => IsBooleanString(vo))
      .isEqualTo('btc-address', () => IsBtcAddress(vo))
      .isEqualTo('credit-card', () => IsCreditCard(vo))
      .isEqualTo('currency', () => IsCurrency(undefined, vo))
      .isEqualTo('data-uri', () => IsDataURI(vo))
      .isEqualTo('date', () => IsISO8601(undefined, vo))
      .isEqualTo('ean', () => IsEAN(vo))
      .isEqualTo('fqdn', () => IsFQDN(undefined, vo))
      .isEqualTo('hash', () => IsHash('sha256', vo))
      .isEqualTo('hsl', () => IsHSL(vo))
      .isEqualTo('iban', () => IsIBAN({}, vo))
      .isEqualTo('isbn', () => IsISBN('13', vo))
      .isEqualTo('json', () => IsJSON(vo))
      .isEqualTo('jwt', () => IsJWT(vo))
      .isEqualTo('passport-number', () => IsPassportNumber('', vo))
      .isEqualTo('phone', () => IsPhoneNumber(undefined, vo))
      .isEqualTo('semver', () => IsSemVer(vo))
      .collect();

    collectedDecorator?.(...args);
  };
}

export function PropValidation(
  options: PropValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const { type: primitiveType, enum: enumType, object: objectType } = options;
    const vo: ValidationOptions = { each: options.isArray === true };

    if (isDefined(primitiveType)) {
      Type(primitiveType)(...args);
    } else if (isDefined(enumType)) {
      IsEnum(enumType, vo)(...args);
    } else if (isDefined(objectType)) {
      Type(objectType)(...args);
      ValidateNested(vo)(...args);
    } else if (options.isArray) {
      throw new Error(
        'One of type, enum, or object must be provided for array properties!',
      );
    }

    const collectedDecorators = new PropertyMathcer(options)
      .isTrue('isArray', () => IsArray())
      .isTrue(
        'excluded',
        () => Exclude(),
        () => Expose({ groups: options.groups }),
      )
      .isTrue(
        'isRequired',
        () => IsDefined(),
        () => IsOptional(),
      )
      .isDefined('isIn', (v) => IsIn(v, vo))
      .isDefined('isNotIn', (v) => IsNotIn(v, vo))

      .isDefined('min', (v) => Min(v, vo))
      .isDefined('max', (v) => Max(v, vo))

      .isDefined('minLength', (v) => MinLength(v, vo))
      .isDefined('maxLength', (v) => MaxLength(v, vo))
      .isDefined('pattern', (v) => Matches(new RegExp(v), vo))

      .isDefined('format', (v) => PropFormatValidation(v, vo))
      .isDefined('maxDate', (v) => MaxDate(v, vo))
      .isDefined('minDate', (v) => MinDate(v, vo))
      .isDefined('maxItems', (v) => ArrayMaxSize(v))
      .isDefined('minItems', (v) => ArrayMinSize(v))

      .isDefined('defaultValue', (v) =>
        Transform(({ value }) => {
          return value ?? v;
        }),
      )

      .collect();

    collectedDecorators.forEach((d) => d(...args));
  };
}
