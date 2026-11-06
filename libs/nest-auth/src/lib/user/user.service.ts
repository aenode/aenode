import { Injectable } from '@aenode/nest/common';
import type { ReadonlyDeep, UserData } from '@aenode/types';

let uuidToUserData: Map<string, ReadonlyDeep<UserData>>;
let usernameToUuid: Map<string, string>;

@Injectable()
export class UserService {
  findByUsername(username: string): ReadonlyDeep<UserData> | undefined {
    const uuid = usernameToUuid.get(username);

    if (uuid) {
      return uuidToUserData.get(uuid);
    }

    return;
  }

  findByUuid(uuid: string): ReadonlyDeep<UserData> | undefined {
    return uuidToUserData.get(uuid);
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
    uuidToUserData.clear();
    usernameToUuid.clear();
  }

  loadUsers(users: UserData[]) {
    const byUuid = new Map<string, Readonly<UserData>>();
    const byUsername = new Map<string, string>();

    for (const user of users) {
      byUuid.set(user.uuid, user);
      byUsername.set(user.username, user.uuid);
    }

    // Swap both maps together so readers never see a half-updated state
    uuidToUserData = byUuid;
    usernameToUuid = byUsername;
  }

  updateUsers(users: UserData[]) {
    for (const user of users) {
      uuidToUserData.set(user.uuid, user);
      usernameToUuid.set(user.username, user.uuid);
    }
  }
}
