import { randomUUID } from 'crypto';
import { ERROR_MAP, type ErrorCode } from './codes.js';
import type {
  ApiErrorResponse,
  ApiMeta,
  ApiSuccessResponse,
  BuiltError,
  BuiltSuccess,
  RequestLike,
} from './types.js';

function readHeader(req: RequestLike | undefined, name: string): string | undefined {
  if (!req) return undefined;
  if (typeof req.header === 'function') {
    return req.header(name)?.trim() || undefined;
  }
  const raw = req.headers?.[name.toLowerCase()];
  if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
  return typeof raw === 'string' ? raw.trim() || undefined : undefined;
}

export function buildMeta(req?: RequestLike, requestId?: string): ApiMeta {
  const fromReq = readHeader(req, 'x-request-id');
  return {
    requestId: requestId || fromReq || `req_${randomUUID().replace(/-/g, '').slice(0, 12)}`,
    timestamp: new Date().toISOString(),
  };
}

export type BuildSuccessOptions = {
  message?: string;
  status?: number;
  req?: RequestLike;
  requestId?: string;
};

export type BuildFailOptions = {
  details?: unknown;
  message?: string;
  req?: RequestLike;
  requestId?: string;
};

/** Build a success envelope (framework-agnostic). */
export function buildSuccess<T>(data: T, options: BuildSuccessOptions = {}): BuiltSuccess<T> {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
    message: options.message ?? 'Operation completed successfully',
    meta: buildMeta(options.req, options.requestId),
  };
  return { status: options.status ?? 200, body };
}

/** Build an error envelope from a code (framework-agnostic). */
export function buildFail(code: ErrorCode, options: BuildFailOptions = {}): BuiltError {
  const def = ERROR_MAP[code];
  const body: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message: options.message ?? def.message,
      details: options.details ?? null,
    },
    meta: buildMeta(options.req, options.requestId),
  };
  return { status: def.status, body };
}
