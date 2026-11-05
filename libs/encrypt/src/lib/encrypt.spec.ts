import { randomBytes } from 'node:crypto';
import { decrypt, encrypt } from './encrypt.js';

describe('encrypt', () => {
  it('should encript', () => {
    const key = randomBytes(32);
    console.log('key: ', key);

    const encripted = encrypt(
      'some long some long some long some long some long some long some long some long some long some long some long some long ',
      key,
    );

    console.log('Encripted: ', encripted);

    console.log('Decrepted: ', decrypt(encripted, key));
  });
});
