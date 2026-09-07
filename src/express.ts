import { buildFail, buildSuccess, type BuildFailOptions, type BuildSuccessOptions } from './build.js';
import type { ErrorCode } from './codes.js';
import type { ResponseLike } from './types.js';

/*
 * Express helpers — pass res + data/code; message/status come from ERROR_MAP.
 *
 * success(res, { id: user.id }, { message: 'User fetched successfully', req });
 * success(res, { auditLogId }, { message: 'Upload queued', status: 202, req });
 * fail(res, 'TOKEN_MISSING', { req });
 * fail(res, 'VALIDATION_ERROR', {
 *   details: { email: { message: 'Please provide a valid email address' } },
 *   req,
 * });
 */

/** Send a success JSON response (Express). */
export function success<T>(res: ResponseLike, data: T, options: BuildSuccessOptions = {}): unknown {
  const { status, body } = buildSuccess(data, options);
  return res.status(status).json(body);
}

/** Send an error JSON response (Express). Pass the code only. */
export function fail(res: ResponseLike, code: ErrorCode, options: BuildFailOptions = {}): unknown {
  const { status, body } = buildFail(code, options);
  return res.status(status).json(body);
}
