export type ErrorDefinition = {
  status: number;
  message: string;
};

/**
 * Stable error codes → HTTP status + default client message.
 * Callers pass the code only; message/status come from here.
 */
export const ERROR_MAP = {
  // Auth
  UNAUTHORIZED: { status: 401, message: 'Authentication required' },
  INVALID_TOKEN: { status: 401, message: 'The authentication token is invalid' },
  TOKEN_EXPIRED: { status: 401, message: 'The authentication token has expired' },
  TOKEN_MISSING: { status: 401, message: 'Authentication token was not provided' },
  INVALID_CREDENTIALS: { status: 401, message: 'Invalid credentials' },
  FORBIDDEN: { status: 403, message: 'You do not have permission to perform this action' },
  INSUFFICIENT_PERMISSIONS: { status: 403, message: 'You lack the required permission' },
  ACCOUNT_DISABLED: { status: 403, message: 'Account has been disabled' },
  ACCOUNT_LOCKED: { status: 403, message: 'Account has been locked' },
  INELIGIBLE_ACCOUNT_TYPE: { status: 422, message: 'This account type is not eligible for this action' },

  // Users
  USER_NOT_FOUND: { status: 404, message: 'User not found' },
  USER_ALREADY_EXISTS: { status: 409, message: 'User already exists' },
  USER_INACTIVE: { status: 403, message: 'User is inactive' },
  USER_DELETED: { status: 410, message: 'User has been deleted' },
  INVALID_USER_ID: { status: 400, message: 'Invalid user id' },

  // Validation / request
  VALIDATION_ERROR: { status: 422, message: 'One or more fields are invalid' },
  BAD_REQUEST: { status: 400, message: 'Invalid request' },
  MISSING_FIELD: { status: 400, message: 'A required field is missing' },
  INVALID_FIELD: { status: 400, message: 'A field contains an invalid value' },
  INVALID_FORMAT: { status: 400, message: 'Invalid format' },
  INVALID_PARAMETER: { status: 400, message: 'Invalid parameter' },
  INVALID_REQUEST_BODY: { status: 400, message: 'Invalid request body' },
  INVALID_REQUEST: { status: 400, message: 'Invalid request' },

  // Generic resources
  RESOURCE_NOT_FOUND: { status: 404, message: 'Resource not found' },
  RESOURCE_ALREADY_EXISTS: { status: 409, message: 'Resource already exists' },
  RESOURCE_DELETED: { status: 410, message: 'Resource has been deleted' },
  RESOURCE_CONFLICT: { status: 409, message: 'Operation conflicts with current state' },
  RESOURCE_LOCKED: { status: 423, message: 'Resource is locked' },
  RESOURCE_UNAVAILABLE: { status: 503, message: 'Resource is temporarily unavailable' },

  // Email / verification
  EMAIL_ALREADY_EXISTS: { status: 409, message: 'Email is already registered' },
  EMAIL_NOT_FOUND: { status: 404, message: 'Email not found' },
  EMAIL_NOT_VERIFIED: { status: 403, message: 'Email has not been verified' },
  INVALID_EMAIL: { status: 422, message: 'Invalid email address' },
  VERIFICATION_REQUIRED: { status: 403, message: 'Verification is required' },
  VERIFICATION_FAILED: { status: 400, message: 'Verification failed' },
  VERIFICATION_CODE_INVALID: { status: 400, message: 'Verification code is invalid' },
  VERIFICATION_CODE_EXPIRED: { status: 400, message: 'Verification code has expired' },
  VERIFICATION_CODE_ALREADY_USED: { status: 400, message: 'Verification code was already used' },

  // Passwords
  INVALID_PASSWORD: { status: 400, message: 'Password is invalid' },
  PASSWORD_TOO_WEAK: { status: 422, message: 'Password does not meet security requirements' },
  PASSWORD_MISMATCH: { status: 422, message: 'Passwords do not match' },
  PASSWORD_SAME_AS_OLD: { status: 409, message: 'New password must be different from the old password' },
  PASSWORD_RESET_REQUIRED: { status: 403, message: 'Password reset is required' },
  PASSWORD_RESET_TOKEN_INVALID: { status: 400, message: 'Password reset token is invalid' },
  PASSWORD_RESET_TOKEN_EXPIRED: { status: 400, message: 'Password reset token has expired' },

  // Sessions / tokens
  SESSION_NOT_FOUND: { status: 404, message: 'Session not found' },
  SESSION_EXPIRED: { status: 401, message: 'Session has expired' },
  SESSION_INVALID: { status: 401, message: 'Session is invalid' },
  REFRESH_TOKEN_INVALID: { status: 401, message: 'Refresh token is invalid' },
  REFRESH_TOKEN_EXPIRED: { status: 401, message: 'Refresh token has expired' },
  REFRESH_TOKEN_REVOKED: { status: 401, message: 'Refresh token has been revoked' },

  // Payments
  PAYMENT_FAILED: { status: 402, message: 'Payment failed' },
  PAYMENT_REQUIRED: { status: 402, message: 'Payment is required' },
  PAYMENT_NOT_FOUND: { status: 404, message: 'Payment not found' },
  PAYMENT_ALREADY_PROCESSED: { status: 409, message: 'Payment was already processed' },
  PAYMENT_DECLINED: { status: 402, message: 'Payment was declined' },
  PAYMENT_EXPIRED: { status: 410, message: 'Payment has expired' },
  INSUFFICIENT_FUNDS: { status: 402, message: 'Insufficient funds' },
  INVALID_PAYMENT_METHOD: { status: 422, message: 'Invalid payment method' },
  REFUND_FAILED: { status: 400, message: 'Refund failed' },
  REFUND_NOT_FOUND: { status: 404, message: 'Refund not found' },
  REFUND_ALREADY_PROCESSED: { status: 409, message: 'Refund was already processed' },

  // Orders
  ORDER_NOT_FOUND: { status: 404, message: 'Order not found' },
  ORDER_ALREADY_EXISTS: { status: 409, message: 'Order already exists' },
  ORDER_ALREADY_CANCELLED: { status: 409, message: 'Order is already cancelled' },
  ORDER_CANNOT_BE_CANCELLED: { status: 409, message: 'Order cannot be cancelled' },
  ORDER_ALREADY_COMPLETED: { status: 409, message: 'Order is already completed' },
  ORDER_INVALID_STATUS: { status: 409, message: 'Invalid order status' },
  ORDER_EMPTY: { status: 422, message: 'Order has no items' },
  ORDER_LIMIT_EXCEEDED: { status: 422, message: 'Order limit exceeded' },

  // Products
  PRODUCT_NOT_FOUND: { status: 404, message: 'Product not found' },
  PRODUCT_ALREADY_EXISTS: { status: 409, message: 'Product already exists' },
  PRODUCT_UNAVAILABLE: { status: 409, message: 'Product is unavailable' },
  PRODUCT_OUT_OF_STOCK: { status: 409, message: 'Product is out of stock' },
  PRODUCT_INACTIVE: { status: 403, message: 'Product is inactive' },
  INVALID_PRODUCT: { status: 422, message: 'Invalid product' },

  // Rate limiting
  RATE_LIMIT_EXCEEDED: { status: 429, message: 'Too many requests. Please try again later.' },
  TOO_MANY_REQUESTS: { status: 429, message: 'Too many requests. Please try again later.' },

  // Files / uploads
  FILE_NOT_FOUND: { status: 404, message: 'File not found' },
  FILE_UPLOAD_FAILED: { status: 500, message: 'File upload failed' },
  FILE_TOO_LARGE: { status: 413, message: 'File exceeds the allowed size' },
  INVALID_FILE_TYPE: { status: 415, message: 'File type is not supported' },
  FILE_REQUIRED: { status: 422, message: 'File is required' },
  FILE_PROCESSING_FAILED: { status: 422, message: 'File could not be processed' },

  // API / server
  ENDPOINT_NOT_FOUND: { status: 404, message: 'Endpoint not found' },
  METHOD_NOT_ALLOWED: { status: 405, message: 'HTTP method is not supported' },
  REQUEST_TIMEOUT: { status: 408, message: 'Request timed out' },
  CONFLICT: { status: 409, message: 'Conflict' },
  UNSUPPORTED_MEDIA_TYPE: { status: 415, message: 'Unsupported content type' },
  INTERNAL_SERVER_ERROR: { status: 500, message: 'An unexpected error occurred' },
  NOT_IMPLEMENTED: { status: 501, message: 'Feature is not implemented' },
  BAD_GATEWAY: { status: 502, message: 'Upstream server error' },
  SERVICE_UNAVAILABLE: { status: 503, message: 'Service is temporarily unavailable' },
  GATEWAY_TIMEOUT: { status: 504, message: 'Upstream server timed out' },

  // Database
  DATABASE_ERROR: { status: 500, message: 'Database error' },
  DATABASE_CONNECTION_ERROR: { status: 503, message: 'Cannot connect to database' },
  DATABASE_TIMEOUT: { status: 503, message: 'Database operation timed out' },
  DUPLICATE_ENTRY: { status: 409, message: 'A resource with the same unique value already exists' },
  TRANSACTION_FAILED: { status: 500, message: 'Database transaction failed' },
} as const satisfies Record<string, ErrorDefinition>;

export type ErrorCode = keyof typeof ERROR_MAP;
