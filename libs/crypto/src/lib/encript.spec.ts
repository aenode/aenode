import { randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { decrypt, encrypt } from './encript.js';

describe('encryption', () => {
  const key = randomBytes(32);

  it('encrypts and decrypts a value', () => {
    const value = 'hello world';

    const encrypted = encrypt(value, key);
    const decrypted = decrypt(encrypted, key);

    expect(decrypted).toBe(value);
  });

  it('produces different ciphertext for the same plaintext', () => {
    const value = 'hello world';

    const encrypted1 = encrypt(value, key);
    const encrypted2 = encrypt(value, key);

    expect(encrypted1).not.toBe(encrypted2);
  });

  it('does not contain the plaintext', () => {
    const value = 'my-super-secret-value';

    const encrypted = encrypt(value, key);

    expect(encrypted).not.toContain(value);
  });

  it('decrypts unicode correctly', () => {
    const value = 'Hello 🔐 世界 café';

    const encrypted = encrypt(value, key);
    const decrypted = decrypt(encrypted, key);

    expect(decrypted).toBe(value);
  });

  it('handles an empty string', () => {
    const value = '';

    const encrypted = encrypt(value, key);
    const decrypted = decrypt(encrypted, key);

    expect(decrypted).toBe(value);
  });

  it('fails when using the wrong key', () => {
    const value = 'secret';

    const encrypted = encrypt(value, key);
    const wrongKey = randomBytes(32);

    expect(() => decrypt(encrypted, wrongKey)).toThrow();
  });

  it('fails when the ciphertext is modified', () => {
    const value = 'secret';

    const encrypted = encrypt(value, key);
    const data = Buffer.from(encrypted, 'base64');

    // Modify one byte of the ciphertext
    data[data.length - 1]! ^= 1;

    const tampered = data.toString('base64');

    expect(() => decrypt(tampered, key)).toThrow();
  });

  it('fails when the authentication tag is modified', () => {
    const value = 'secret';

    const encrypted = encrypt(value, key);
    const data = Buffer.from(encrypted, 'base64');

    // Authentication tag occupies bytes 12-27.
    data[12]! ^= 1;

    const tampered = data.toString('base64');

    expect(() => decrypt(tampered, key)).toThrow();
  });
});
