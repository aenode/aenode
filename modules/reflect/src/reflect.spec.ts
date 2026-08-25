/* eslint-disable @typescript-eslint/consistent-type-imports */
import 'reflect-metadata';
//
import { StringPromise } from '@aenode/types';
import { getPropertyType, getReturnType } from './reflect.js';

describe('reflect', () => {
  describe('propertyType', () => {
    it('should get the property type', () => {
      const Prop: PropertyDecorator = () => ({});

      class Other {
        @Prop name: string;
      }

      class OtherArray extends Array<Other> {}
      class StringArray extends Array<string> {}
      class Sample {
        @Prop str: string;
        @Prop num: number;
        @Prop bool: boolean;
        @Prop date: Date;
        @Prop buffer: Buffer;
        @Prop other: Other;
        @Prop others: OtherArray;
        @Prop strArr: StringArray;
      }

      const s = new Sample();

      s.strArr = [''];

      expect(getPropertyType(Sample.prototype, 'str')).toEqual(String);
      expect(getPropertyType(Sample.prototype, 'num')).toEqual(Number);
      expect(getPropertyType(Sample.prototype, 'bool')).toEqual(Boolean);
      expect(getPropertyType(Sample.prototype, 'date')).toEqual(Date);
      expect(getPropertyType(Sample.prototype, 'buffer')).toEqual(Buffer);
      expect(getPropertyType(Sample.prototype, 'other')).toEqual(Other);
      expect(getPropertyType(Sample.prototype, 'strArr')).toEqual(StringArray);
      expect(getPropertyType(Sample.prototype, 'others')).toEqual(OtherArray);
    });
  });

  describe('returnType', () => {
    it('should get the return type', () => {
      function Method(type?: any): MethodDecorator {
        return () => {
          console.log(type);
          return;
        };
      }
      class Sample {
        async other(): Promise<string> {
          return '';
        }
        @Method()
        str(): StringPromise {
          return this.other();
        }
      }

      expect(getReturnType(Sample.prototype, 'str')).toEqual(String);
    });
  });
});
