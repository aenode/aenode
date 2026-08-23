import 'reflect-metadata';
import { getType } from './reflect.js';

describe('reflect', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('propertyType', () => {
    it('should get the propert type', () => {
      const fn = vi.fn();
      function Prop(): PropertyDecorator {
        return (target, propertyKey) => {
          const type = getType(target, propertyKey);
          fn(type);
        };
      }

      class Sample {
        @Prop() str: string;
        @Prop() num: number;
        @Prop() bool: boolean;
        @Prop() date: Date;
      }

      expect(Sample).toBeDefined();

      expect(fn).toHaveBeenCalledWith(String);
      expect(fn).toHaveBeenCalledWith(Number);
      expect(fn).toHaveBeenCalledWith(Boolean);
      expect(fn).toHaveBeenCalledWith(Date);

      expect(fn).toHaveBeenCalledTimes(4);
    });
  });
});
