import { Injectable } from '@aenode/nest/common';
import type { ReadonlyDeep } from '@aenode/types';
import type { User } from '../dtos/user.js';

let uuidToAuthUser: Map<string, ReadonlyDeep<User>>;
let usernameToUuid: Map<string, string>;

@Injectable()
export class UserService {
  findByUsername(username: string): ReadonlyDeep<User> | undefined {
    const uuid = usernameToUuid.get(username);

    if (uuid) {
      return uuidToAuthUser.get(uuid);
    }

    return;
  }

  findByUuid(uuid: string): ReadonlyDeep<User> | undefined {
    return uuidToAuthUser.get(uuid);
  }

  isAdmin(userUuid: string) {
    return !!this.findByUuid(userUuid)?.isAdmin;
  }

  hasPermission(userUuid: string, requiredPermission: string): boolean {
    return !!this.findByUuid(userUuid)?.permissions?.has(requiredPermission);
  }

  hasRole(userUuid: string, requiredRole: string): boolean {
    return !!this.findByUuid(userUuid)?.roles?.has(requiredRole);
  }

  clearUsers() {
    uuidToAuthUser.clear();
    usernameToUuid.clear();
  }

  loadUsers(users: User[]) {
    const byUuid = new Map<string, Readonly<User>>();
    const byUsername = new Map<string, string>();

    for (const user of users) {
      byUuid.set(user.uuid, user);
      byUsername.set(user.username, user.uuid);
    }

    // Swap both maps together so readers never see a half-updated state
    uuidToAuthUser = byUuid;
    usernameToUuid = byUsername;
  }

  updateUsers(users: User[]) {
    for (const user of users) {
      uuidToAuthUser.set(user.uuid, user);
      usernameToUuid.set(user.username, user.uuid);
    }
  }
}
