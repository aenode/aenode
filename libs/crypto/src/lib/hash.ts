import { hash as __hash, verify } from 'argon2';

export async function hash(value: string): Promise<string> {
  return await __hash(value);
}

export async function verifyHash(
  digest: string,
  value: string,
): Promise<boolean> {
  return await verify(digest, value);
}
