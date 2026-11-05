import { hash, verify } from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password);
}

export async function verifyPassword(hashValue: string, password: string) {
  return verify(hashValue, password);
}
