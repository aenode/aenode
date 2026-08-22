import { isDefined } from './is.js';

describe('isDefined', () => {
  describe('defined', () => {
    it.each`
      value
      ${true}
      ${false}
      ${0}
      ${-1}
      ${'v'}
      ${NaN}
      ${() => ({})}
      ${new Date()}
      ${new Date('Some')}
      ${{ some: 'some' }}
    `('isDefined($value) -> true', ({ value }) => {
      expect(isDefined(value)).toBeTruthy();
    });
  });

  describe('undefiend', () => {
    it.each`
      value
      ${null}
      ${undefined}
    `('isDefined($value) -> false', ({ value }) => {
      expect(isDefined(value)).toBeFalsy();
    });
  });
});
