import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionCacheService {
  protected readonly sesionIdUserIdMap = new Map<number, number>();

  getUserId(sesionId: number) {
    return this.sesionIdUserIdMap.get(sesionId);
  }

  has(sessionId: number) {
    return this.sesionIdUserIdMap.has(sessionId);
  }

  removeAll(userId: number) {
    for (const [sessionId, foundUserId] of this.sesionIdUserIdMap.entries()) {
      if (userId === foundUserId) {
        this.remove(sessionId);
      }
    }
  }

  remove(sesionId: number) {
    this.sesionIdUserIdMap.delete(sesionId);
  }

  add(sesionId: number, userId: number) {
    this.sesionIdUserIdMap.set(sesionId, userId);
  }
}
