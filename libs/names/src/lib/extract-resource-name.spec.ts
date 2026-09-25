import { extractResourceName } from './extract-resource-name.js';
describe('extractResourceName', () => {
  it.each`
    value
    ${'UserService'}
    ${'UserController'}
    ${'UserResolver'}
  `('extractResourceName($value) -> User', ({ value }) => {
    expect(extractResourceName(value)).toEqual('User');
  });
});
