# api-response-standard

Consistent REST API success/error envelopes with stable error codes.

Install once, call `success` / `fail` with a code — HTTP status and message come from the map.

## Install

```bash
npm install api-response-standard
```

```bash
pnpm add api-response-standard
```

```bash
yarn add api-response-standard
```

Optional (for Express helpers):

```bash
npm install express
# or: pnpm add express / yarn add express
```

## Response shape

### Success

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "meta": {
    "requestId": "req_ab12cd34ef56",
    "timestamp": "2026-09-07T10:37:00.000Z"
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
    "requestId": "req_ab12cd34ef56",
    "timestamp": "2026-09-07T10:37:00.000Z"
  }
}
```

## Express usage

```ts
import { success, fail } from 'api-response-standard';

app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id);
  if (!user) {
    fail(res, 'USER_NOT_FOUND', { req });
    return;
  }

  success(res, user, { message: 'User fetched successfully', req });
});

app.post('/login', (req, res) => {
  fail(res, 'INVALID_CREDENTIALS', { req });
});

app.post('/upload', (req, res) => {
  if (!req.file) {
    fail(res, 'FILE_REQUIRED', { req });
    return;
  }

  success(res, { id: 'upl_1' }, { message: 'Upload queued', status: 202, req });
});
```

Pass only the **code** on errors. Message + status are resolved from `ERROR_MAP`.

Optional overrides:

```ts
fail(res, 'VALIDATION_ERROR', {
  details: {
    email: { message: 'Please provide a valid email address' },
  },
  req,
});

fail(res, 'RATE_LIMIT_EXCEEDED', {
  details: { retryAfter: 60 },
  req,
});
```

## Framework-agnostic builders

If you are not on Express:

```ts
import { buildSuccess, buildFail } from 'api-response-standard';

const ok = buildSuccess({ id: 1 }, { message: 'Created', status: 201 });
// { status: 201, body: { success: true, data, message, meta } }

const err = buildFail('TOKEN_MISSING');
// { status: 401, body: { success: false, error, meta } }

res.statusCode = err.status;
res.end(JSON.stringify(err.body));
```

## Error map

```ts
import { ERROR_MAP, type ErrorCode } from 'api-response-standard';

ERROR_MAP.USER_NOT_FOUND;
// { status: 404, message: 'User not found' }
```

Full catalog: [docs/error-codes.md](./docs/error-codes.md)

## License

MIT
