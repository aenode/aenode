import 'reflect-metadata';
import { __PropBoolean } from './prop-boolean.js';
import { __PropDate } from './prop-date.js';
import { __PropEnum } from './prop-enum.js';
import { __PropNumber } from './prop-number.js';
import { __PropObject } from './prop-object.js';
import {
  type PropBooleanOptions,
  type PropDateOptions,
  type PropEnumOptions,
  type PropNumberOptions,
  type PropObjectOptions,
  type PropOptions,
  type PropStringOptions,
} from './prop-options.js';
import { __PropString } from './prop-string.js';

export function PropValidation(options?: PropOptions): PropertyDecorator {
  options ??= {};

  return (...args) => {
    const inferedType = Reflect.getMetadata('design:type', ...args);

    if (
      inferedType === Array &&
      !options.type &&
      !(options as PropEnumOptions).enum
    ) {
      throw new Error('type or enum options is required for array properties ');
    }

    options.type ??= inferedType;

    switch (options.type) {
      case String: {
        __PropString(options as PropStringOptions)(...args);
        break;
      }
      case Number: {
        __PropNumber(options as PropNumberOptions)(...args);
        break;
      }
      case Boolean: {
        __PropBoolean(options as PropBooleanOptions)(...args);
        break;
      }
      case Date: {
        __PropDate(options as PropDateOptions)(...args);
        break;
      }
      default: {
        if ((options as PropEnumOptions).enum) {
          __PropEnum(options as PropEnumOptions)(...args);
        } else {
          __PropObject(options as PropObjectOptions)(...args);
        }

        break;
      }
    }
  };
}
