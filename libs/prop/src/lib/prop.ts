import 'reflect-metadata';
import { PropBoolean } from './prop-boolean.js';
import { PropDate } from './prop-date.js';
import { PropNumber } from './prop-number.js';
import { PropObject } from './prop-object.js';
import {
  type PropBooleanOptions,
  type PropDateOptions,
  type PropNumberOptions,
  type PropObjectOptions,
  type PropOptions,
  type PropStringOptions,
} from './prop-options.js';
import { PropString } from './prop-string.js';

export function PropValidation(options: PropOptions): PropertyDecorator {
  return (...args) => {
    if (options.type) {
      switch (options.type) {
        case String: {
          PropString(options as PropStringOptions)(...args);
          break;
        }
        case Number: {
          PropNumber(options as PropNumberOptions)(...args);
          break;
        }
        case Boolean: {
          PropBoolean(options as PropBooleanOptions)(...args);
          break;
        }
        case Date: {
          PropDate(options as PropDateOptions)(...args);
          break;
        }
        default: {
          PropObject(options as PropObjectOptions)(...args);
          break;
        }
      }
    }
  };
}
