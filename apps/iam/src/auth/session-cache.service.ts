import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class SessionCacheService {
  protected readonly sesionIdUserIdMap = new Map<number, number>();
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Session)
    protected readonly sessionService: Prisma.SessionDelegate,
  ) {}

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
    if (this.has(sesionId)) {
      throw new InternalServerErrorException(
        'Session already exist in the cache',
      );
    }
    this.sesionIdUserIdMap.set(sesionId, userId);
  }
}
