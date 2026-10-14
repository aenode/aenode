import type { Request } from 'express';

export type RequestUserInfo = { user: { id: number } };
export type ExtendedRequest = Request & RequestUserInfo;
