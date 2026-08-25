import 'reflect-metadata';
//
import { RequiredOptionError } from '@aenode/errors';
import { EqualMatcher, PropertyMathcer } from '@aenode/flow';
import { isNotDefined } from '@aenode/is';
import {
  PropType,
  type PropFormat,
  type PropValidationOptions,
} from '@aenode/prop-options';
import { applyDecorators, getType } from '@aenode/reflect';
import { Exclude, Expose, Type } from 'class-transformer';
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

export function normalizePropValidaitonOptions(
  options: PropValidationOptions = {},
  target: Parameters<PropertyDecorator>[0],
  propertyKey: Parameters<PropertyDecorator>[1],
): PropValidationOptions {
  if (options.isArray === true) {
    if (isNotDefined(options.type)) {
      throw new Error(`The type options is required for array properties!`);
    }
  }

  if (isNotDefined(options.type)) {
    const inferedType = getType(target, propertyKey);
    if (PropType[inferedType.name as PropType] === undefined) {
      throw new RequiredOptionError(
        `The type option is required! The infered type is not a known typescript type.`,
      );
    }
  }

  return options;
}

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
    options = normalizePropValidaitonOptions(options, ...args);
    const vo: ValidationOptions = { each: options.isArray === true };

    const collectedDecorators = new PropertyMathcer(options)

      .isDefined('type', (v) => applyDecorators(Type(v), ValidateNested(vo)))
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

      .isDefined('format', () =>
        PropFormatValidation(options.format as PropFormat, vo),
      )

      .isDefined('maxDate', (v) => MaxDate(v, vo))
      .isDefined('minDate', (v) => MinDate(v, vo))
      .isDefined('maxItems', (v) => ArrayMaxSize(v))
      .isDefined('minItems', (v) => ArrayMinSize(v))

      .collect();

    collectedDecorators.forEach((d) => d(...args));
  };
}
