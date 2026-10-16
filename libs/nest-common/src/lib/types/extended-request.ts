import type { Request, Response } from 'express';

export type RequestUserInfo = { user: { id: number } };
export type ExtendedRequest = Request & RequestUserInfo;

export type ExtendedResponse = Response;
