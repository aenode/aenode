import 'reflect-metadata';

describe('prop', () => {
  it('should work', () => {
    enum SomeEnum {
      Some = 'Some',
    }

    console.log(typeof SomeEnum);
    expect(1).toEqual(1);
  });
});
