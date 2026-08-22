import { brandEmail } from './brand-email.js';

describe('@aenode/brand-email', () => {
  it('skip test', () => {
    expect(brandEmail('some@email.com', 'brand')).toEqual(
      `some+brand@email.com`,
    );
  });
});
