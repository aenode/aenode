import { describe, expect, it } from 'vitest';
import { hash, verifyHash } from './hash.js';

describe('password hashing', () => {
  it('hashes a password', async () => {
    const password = 'my-secret-password';

    const digest = await hash(password);

    expect(digest).toBeTypeOf('string');
    expect(digest.length).toBeGreaterThan(0);
    expect(digest).not.toBe(password);
  });

  it('produces a different hash for the same password', async () => {
    const password = 'my-secret-password';

    const digest1 = await hash(password);
    const digest2 = await hash(password);

    expect(digest1).not.toBe(digest2);
  });

  it('verifies the correct password', async () => {
    const password = 'my-secret-password';

    const digest = await hash(password);

    await expect(verifyHash(digest, password)).resolves.toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const password = 'my-secret-password';
    const wrongPassword = 'wrong-password';

    const digest = await hash(password);

    await expect(verifyHash(digest, wrongPassword)).resolves.toBe(false);
  });

  it('handles unicode passwords', async () => {
    const password = 'pássw🔐rd世界';

    const digest = await hash(password);

    await expect(verifyHash(digest, password)).resolves.toBe(true);
  });

  it('handles an empty password', async () => {
    const password = '';

    const digest = await hash(password);

    await expect(verifyHash(digest, password)).resolves.toBe(true);
  });

  it('fails for a malformed digest', async () => {
    await expect(
      verifyHash('not-a-valid-argon2-hash', 'password'),
    ).rejects.toThrow();
  });
});
