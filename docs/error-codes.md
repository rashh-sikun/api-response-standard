# API Error Code Standard

Shared response and error-code conventions for REST APIs.

Clients should branch on `error.code` and HTTP status, not on free-text `message`.

---

## Response envelope

### Success

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "meta": {
    "requestId": "req_01JXYZ123",
    "timestamp": "2026-09-07T10:37:00Z"
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found",
    "details": null
  },
  "meta": {
    "requestId": "req_01JXYZ123",
    "timestamp": "2026-09-07T10:37:00Z"
  }
}
```

### Validation error

Field-level problems go in `error.details`:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid",
    "details": {
      "email": { "message": "Please provide a valid email address" },
      "password": { "message": "Password must be at least 8 characters" }
    }
  },
  "meta": {
    "requestId": "req_01JXYZ456",
    "timestamp": "2026-09-07T10:38:12Z"
  }
}
```

Every response includes:

| Field | Notes |
|---|---|
| `meta.requestId` | Unique per request (from `x-request-id` or generated) |
| `meta.timestamp` | UTC ISO-8601 |

---

## HTTP status codes

| Status | When to use |
|---:|---|
| 200 | OK |
| 201 | Created |
| 204 | Success, empty body |
| 400 | Malformed / invalid request |
| 401 | Auth missing or failed |
| 402 | Payment required / failed |
| 403 | Authenticated but not allowed |
| 404 | Missing resource or route |
| 405 | Method not supported |
| 408 | Request timed out |
| 409 | Conflict with current state |
| 410 | Permanently gone |
| 413 | Payload / file too large |
| 415 | Unsupported content / file type |
| 422 | Validation or business-rule failure |
| 423 | Locked |
| 429 | Rate limited |
| 500 | Unexpected server error |
| 501 | Not implemented |
| 502 | Upstream failure |
| 503 | Temporarily unavailable |
| 504 | Upstream timeout |

---

## Error codes

Codes are `UPPER_SNAKE_CASE` and stable. Do not embed IDs or dynamic values in the code string.

### Auth

| Code | HTTP | Meaning |
|---|---:|---|
| `UNAUTHORIZED` | 401 | Auth required |
| `INVALID_TOKEN` | 401 | Token invalid |
| `TOKEN_EXPIRED` | 401 | Token expired |
| `TOKEN_MISSING` | 401 | Token not provided |
| `INVALID_CREDENTIALS` | 401 | Bad credentials / API key |
| `FORBIDDEN` | 403 | Not permitted |
| `INSUFFICIENT_PERMISSIONS` | 403 | Missing permission |
| `ACCOUNT_DISABLED` | 403 | Account disabled |
| `ACCOUNT_LOCKED` | 403 | Account locked |

### Users

| Code | HTTP | Meaning |
|---|---:|---|
| `USER_NOT_FOUND` | 404 | User does not exist |
| `USER_ALREADY_EXISTS` | 409 | User already exists |
| `USER_INACTIVE` | 403 | User inactive |
| `USER_DELETED` | 410 | User deleted |
| `INVALID_USER_ID` | 400 | Bad user id |

### Validation / request

| Code | HTTP | Meaning |
|---|---:|---|
| `VALIDATION_ERROR` | 422 | Validation failed |
| `BAD_REQUEST` | 400 | Invalid request |
| `MISSING_FIELD` | 400 | Required field missing |
| `INVALID_FIELD` | 400 | Invalid field value |
| `INVALID_FORMAT` | 400 | Invalid format |
| `INVALID_PARAMETER` | 400 | Invalid query/path param |
| `INVALID_REQUEST_BODY` | 400 | Invalid body |
| `INVALID_REQUEST` | 400 | Generic invalid request |

### Generic resources

Prefer `<RESOURCE>_NOT_FOUND` when you have a clear resource name (`PRODUCT_NOT_FOUND`, `ORDER_NOT_FOUND`). Fall back to these when you do not:

| Code | HTTP | Meaning |
|---|---:|---|
| `RESOURCE_NOT_FOUND` | 404 | Missing |
| `RESOURCE_ALREADY_EXISTS` | 409 | Already exists |
| `RESOURCE_DELETED` | 410 | Deleted |
| `RESOURCE_CONFLICT` | 409 | State conflict |
| `RESOURCE_LOCKED` | 423 | Locked |
| `RESOURCE_UNAVAILABLE` | 503 | Temporarily unavailable |

### Email / verification

| Code | HTTP | Meaning |
|---|---:|---|
| `EMAIL_ALREADY_EXISTS` | 409 | Email taken |
| `EMAIL_NOT_FOUND` | 404 | Email unknown |
| `EMAIL_NOT_VERIFIED` | 403 | Not verified |
| `INVALID_EMAIL` | 422 | Bad email |
| `VERIFICATION_REQUIRED` | 403 | Verification required |
| `VERIFICATION_FAILED` | 400 | Verification failed |
| `VERIFICATION_CODE_INVALID` | 400 | Bad code |
| `VERIFICATION_CODE_EXPIRED` | 400 | Code expired |
| `VERIFICATION_CODE_ALREADY_USED` | 400 | Code already used |

### Passwords

| Code | HTTP | Meaning |
|---|---:|---|
| `INVALID_PASSWORD` | 400 | Wrong / invalid password |
| `PASSWORD_TOO_WEAK` | 422 | Does not meet policy |
| `PASSWORD_MISMATCH` | 422 | Confirmation mismatch |
| `PASSWORD_SAME_AS_OLD` | 409 | Same as previous |
| `PASSWORD_RESET_REQUIRED` | 403 | Reset required |
| `PASSWORD_RESET_TOKEN_INVALID` | 400 | Bad reset token |
| `PASSWORD_RESET_TOKEN_EXPIRED` | 400 | Reset token expired |

### Sessions / tokens

| Code | HTTP | Meaning |
|---|---:|---|
| `SESSION_NOT_FOUND` | 404 | Session missing |
| `SESSION_EXPIRED` | 401 | Session expired |
| `SESSION_INVALID` | 401 | Session invalid |
| `REFRESH_TOKEN_INVALID` | 401 | Bad refresh token |
| `REFRESH_TOKEN_EXPIRED` | 401 | Refresh token expired |
| `REFRESH_TOKEN_REVOKED` | 401 | Refresh token revoked |

### Payments

| Code | HTTP | Meaning |
|---|---:|---|
| `PAYMENT_FAILED` | 402 | Payment failed |
| `PAYMENT_REQUIRED` | 402 | Payment required |
| `PAYMENT_NOT_FOUND` | 404 | Payment missing |
| `PAYMENT_ALREADY_PROCESSED` | 409 | Already processed |
| `PAYMENT_DECLINED` | 402 | Declined |
| `PAYMENT_EXPIRED` | 410 | Expired |
| `INSUFFICIENT_FUNDS` | 402 | Insufficient funds |
| `INVALID_PAYMENT_METHOD` | 422 | Bad method |
| `REFUND_FAILED` | 400 | Refund failed |
| `REFUND_NOT_FOUND` | 404 | Refund missing |
| `REFUND_ALREADY_PROCESSED` | 409 | Refund already done |

### Orders

| Code | HTTP | Meaning |
|---|---:|---|
| `ORDER_NOT_FOUND` | 404 | Order missing |
| `ORDER_ALREADY_EXISTS` | 409 | Already exists |
| `ORDER_ALREADY_CANCELLED` | 409 | Already cancelled |
| `ORDER_CANNOT_BE_CANCELLED` | 409 | Cannot cancel |
| `ORDER_ALREADY_COMPLETED` | 409 | Already completed |
| `ORDER_INVALID_STATUS` | 409 | Invalid status |
| `ORDER_EMPTY` | 422 | No items |
| `ORDER_LIMIT_EXCEEDED` | 422 | Limit exceeded |

### Products

| Code | HTTP | Meaning |
|---|---:|---|
| `PRODUCT_NOT_FOUND` | 404 | Product missing |
| `PRODUCT_ALREADY_EXISTS` | 409 | Already exists |
| `PRODUCT_UNAVAILABLE` | 409 | Unavailable |
| `PRODUCT_OUT_OF_STOCK` | 409 | Out of stock |
| `PRODUCT_INACTIVE` | 403 | Inactive |
| `INVALID_PRODUCT` | 422 | Invalid product |

### Rate limiting

| Code | HTTP | Meaning |
|---|---:|---|
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `TOO_MANY_REQUESTS` | 429 | Alias of the above |

### Files / uploads

| Code | HTTP | Meaning |
|---|---:|---|
| `FILE_NOT_FOUND` | 404 | File missing |
| `FILE_UPLOAD_FAILED` | 500 | Upload failed |
| `FILE_TOO_LARGE` | 413 | Over size limit |
| `INVALID_FILE_TYPE` | 415 | Unsupported type |
| `FILE_REQUIRED` | 422 | File missing |
| `FILE_PROCESSING_FAILED` | 422 | Could not process file |

### API / server

| Code | HTTP | Meaning |
|---|---:|---|
| `ENDPOINT_NOT_FOUND` | 404 | Unknown route |
| `METHOD_NOT_ALLOWED` | 405 | Bad method |
| `REQUEST_TIMEOUT` | 408 | Timed out |
| `CONFLICT` | 409 | Generic conflict |
| `UNSUPPORTED_MEDIA_TYPE` | 415 | Bad content type |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected error |
| `NOT_IMPLEMENTED` | 501 | Not implemented |
| `BAD_GATEWAY` | 502 | Upstream error |
| `SERVICE_UNAVAILABLE` | 503 | Unavailable |
| `GATEWAY_TIMEOUT` | 504 | Upstream timeout |

### Database

| Code | HTTP | Meaning |
|---|---:|---|
| `DATABASE_ERROR` | 500 | DB error |
| `DATABASE_CONNECTION_ERROR` | 503 | Cannot connect |
| `DATABASE_TIMEOUT` | 503 | DB timed out |
| `DUPLICATE_ENTRY` | 409 | Unique constraint |
| `TRANSACTION_FAILED` | 500 | Transaction failed |

Never return stack traces, SQL, secrets, or internal exception text in production responses.

---

## Core set

You do not need every code above. A solid default catalog:

```text
BAD_REQUEST
VALIDATION_ERROR

UNAUTHORIZED
INVALID_CREDENTIALS
INVALID_TOKEN
TOKEN_EXPIRED
TOKEN_MISSING
FORBIDDEN
INSUFFICIENT_PERMISSIONS

USER_NOT_FOUND
USER_ALREADY_EXISTS
USER_INACTIVE
USER_DELETED

RESOURCE_NOT_FOUND
RESOURCE_ALREADY_EXISTS
RESOURCE_CONFLICT

EMAIL_ALREADY_EXISTS
EMAIL_NOT_VERIFIED
VERIFICATION_CODE_INVALID
VERIFICATION_CODE_EXPIRED

PASSWORD_MISMATCH
PASSWORD_TOO_WEAK
PASSWORD_RESET_TOKEN_INVALID
PASSWORD_RESET_TOKEN_EXPIRED

FILE_REQUIRED
FILE_TOO_LARGE
INVALID_FILE_TYPE
FILE_UPLOAD_FAILED

RATE_LIMIT_EXCEEDED

DATABASE_ERROR
INTERNAL_SERVER_ERROR
SERVICE_UNAVAILABLE
```

Add domain codes (`ORDER_*`, `PAYMENT_*`, …) when those features ship.

---

## Naming

Use:

```text
USER_NOT_FOUND
EMAIL_ALREADY_EXISTS
PAYMENT_DECLINED
```

Avoid:

```text
UserNotFound
user_not_found
USER-NOT-FOUND
USER_12345_NOT_FOUND
```

Put variable data in `message` or `details`, not in `code`.

---

## Rules

1. Match HTTP status to the failure mode.
2. Always send a stable `error.code`.
3. Keep `message` short and human-readable.
4. Use `details` for structured extras (`retryAfter`, field errors, etc.).
5. Always include `meta.requestId` and `meta.timestamp`.
6. Do not leak internals in client responses.
7. Keep codes consistent across services.
8. Document public codes; clients depend on `code`, not `message`.

---

## Examples

### `GET /users/:id` — found

```http
HTTP/1.1 200 OK
```

```json
{
  "success": true,
  "data": {
    "id": "usr_12345",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "message": "User fetched successfully",
  "meta": {
    "requestId": "req_01JXYZ123",
    "timestamp": "2026-09-07T10:37:00Z"
  }
}
```

### Not found

```http
HTTP/1.1 404 Not Found
```

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found",
    "details": null
  },
  "meta": {
    "requestId": "req_01JXYZ124",
    "timestamp": "2026-09-07T10:38:00Z"
  }
}
```

### Unauthorized

```http
HTTP/1.1 401 Unauthorized
```

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "The authentication token is invalid or expired",
    "details": null
  },
  "meta": {
    "requestId": "req_01JXYZ125",
    "timestamp": "2026-09-07T10:39:00Z"
  }
}
```

### Rate limited

```http
HTTP/1.1 429 Too Many Requests
```

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": { "retryAfter": 60 }
  },
  "meta": {
    "requestId": "req_01JXYZ009",
    "timestamp": "2026-09-07T10:45:00Z"
  }
}
```

---

## Suggested docs layout

If you publish this as its own repo or docs package:

```text
api-response-standard/
├── README.md                 # this file (or a short index)
├── error-codes.md            # optional split of the catalog
└── examples/
    ├── success.json
    ├── validation-error.json
    ├── unauthorized.json
    ├── not-found.json
    └── internal-server-error.json
```

---

## Quick reference

```text
400 BAD_REQUEST | MISSING_FIELD | INVALID_FIELD | INVALID_FORMAT
    INVALID_PARAMETER | INVALID_REQUEST_BODY | INVALID_REQUEST

401 UNAUTHORIZED | INVALID_TOKEN | TOKEN_EXPIRED | TOKEN_MISSING
    INVALID_CREDENTIALS | SESSION_EXPIRED | SESSION_INVALID
    REFRESH_TOKEN_INVALID | REFRESH_TOKEN_EXPIRED | REFRESH_TOKEN_REVOKED

402 PAYMENT_REQUIRED | PAYMENT_FAILED | PAYMENT_DECLINED | INSUFFICIENT_FUNDS

403 FORBIDDEN | INSUFFICIENT_PERMISSIONS | ACCOUNT_DISABLED | ACCOUNT_LOCKED
    USER_INACTIVE | EMAIL_NOT_VERIFIED | VERIFICATION_REQUIRED
    PASSWORD_RESET_REQUIRED | PRODUCT_INACTIVE

404 USER_NOT_FOUND | RESOURCE_NOT_FOUND | EMAIL_NOT_FOUND | SESSION_NOT_FOUND
    PAYMENT_NOT_FOUND | REFUND_NOT_FOUND | ORDER_NOT_FOUND | PRODUCT_NOT_FOUND
    FILE_NOT_FOUND | ENDPOINT_NOT_FOUND

405 METHOD_NOT_ALLOWED
408 REQUEST_TIMEOUT

409 USER_ALREADY_EXISTS | RESOURCE_ALREADY_EXISTS | RESOURCE_CONFLICT
    PAYMENT_ALREADY_PROCESSED | REFUND_ALREADY_PROCESSED | ORDER_ALREADY_EXISTS
    ORDER_ALREADY_CANCELLED | ORDER_CANNOT_BE_CANCELLED | ORDER_ALREADY_COMPLETED
    ORDER_INVALID_STATUS | PRODUCT_ALREADY_EXISTS | PRODUCT_UNAVAILABLE
    PRODUCT_OUT_OF_STOCK | PASSWORD_SAME_AS_OLD | DUPLICATE_ENTRY | CONFLICT

410 USER_DELETED | RESOURCE_DELETED | PAYMENT_EXPIRED

413 FILE_TOO_LARGE
415 UNSUPPORTED_MEDIA_TYPE | INVALID_FILE_TYPE

422 VALIDATION_ERROR | INVALID_EMAIL | PASSWORD_TOO_WEAK | PASSWORD_MISMATCH
    INVALID_PAYMENT_METHOD | ORDER_EMPTY | ORDER_LIMIT_EXCEEDED
    INVALID_PRODUCT | FILE_REQUIRED | FILE_PROCESSING_FAILED

423 RESOURCE_LOCKED
429 RATE_LIMIT_EXCEEDED | TOO_MANY_REQUESTS

500 INTERNAL_SERVER_ERROR | DATABASE_ERROR | TRANSACTION_FAILED | FILE_UPLOAD_FAILED
501 NOT_IMPLEMENTED
502 BAD_GATEWAY
503 SERVICE_UNAVAILABLE | RESOURCE_UNAVAILABLE | DATABASE_CONNECTION_ERROR | DATABASE_TIMEOUT
504 GATEWAY_TIMEOUT
```
