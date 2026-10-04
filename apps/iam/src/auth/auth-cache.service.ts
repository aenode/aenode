import { Injectable } from '@nestjs/common';

export type PermissionRecord = {
  [scopeId: number]: {
    [permission: string]: boolean;
  };
};

@Injectable()
export class AuthCacheService {
  protected readonly userIdPermissionsMap = new Map<number, PermissionRecord>();
  protected readonly sesionIdUserIdMap = new Map<number, number>();

  getUserId(sesionId: number) {
    return this.sesionIdUserIdMap.get(sesionId);
  }

  getPermissions(userId: number) {
    return this.userIdPermissionsMap.get(userId);
  }

  hasPermission(userId: number, scopeId: number, permission: string) {
    return !!this.userIdPermissionsMap.get(userId)?.[scopeId]?.[permission];
  }

  hasSession(sessionId: number) {
    return this.sesionIdUserIdMap.has(sessionId);
  }

  removeAllSessions(userId: number) {
    for (const [sessionId, foundUserId] of this.sesionIdUserIdMap.entries()) {
      if (userId === foundUserId) {
        this.removeSession(sessionId);
      }
    }
  }

  removeSession(sesionId: number) {
    this.sesionIdUserIdMap.delete(sesionId);
  }

  addSession(sesionId: number, userId: number) {
    this.sesionIdUserIdMap.set(sesionId, userId);
  }
}
