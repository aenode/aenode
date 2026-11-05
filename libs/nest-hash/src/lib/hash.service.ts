import { hashPassword, verifyPassword } from '@aenode/hash';
import { Injectable } from '@aenode/nest/common';
@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    return await hashPassword(password);
  }

  async verifyPassword(hashValue: string, password: string): Promise<boolean> {
    return await verifyPassword(hashValue, password);
  }
}
