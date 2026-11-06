import type { Session } from './session.js';

export class User {
  id: number;
  uuid: string;
  username: string;
  password: string;
  isAdmin?: boolean;
  roles?: Set<string>;
  permissions?: Set<string>;
  sessions?: Session[];
}
