import type { ErrorCode } from './codes.js';

export type ApiMeta = {
  requestId: string;
  timestamp: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message: string;
  meta: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details: unknown;
  };
  meta: ApiMeta;
};

export type BuiltSuccess<T> = {
  status: number;
  body: ApiSuccessResponse<T>;
};

export type BuiltError = {
  status: number;
  body: ApiErrorResponse;
};

/** Minimal request shape (Express-compatible). */
export type RequestLike = {
  header?(name: string): string | undefined;
  headers?: Record<string, string | string[] | undefined>;
};

/** Minimal response shape (Express-compatible). */
export type ResponseLike = {
  status(code: number): { json(body: unknown): unknown };
};
