import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  level: process.env.LOG_LEVEL ?? 'info',
  format: process.env.LOG_FORMAT ?? 'pretty',
  retention: parseInt(process.env.LOG_RETENTION_DAYS ?? '30', 10),

  files: {
    enabled: process.env.LOG_FILES_ENABLED === 'true',
    directory: process.env.LOG_FILES_DIRECTORY ?? 'logs',
    maxSize: process.env.LOG_FILES_MAX_SIZE ?? '20m',
    maxFiles: process.env.LOG_FILES_MAX_FILES ?? '14d',
  },

  http: {
    logRequestBody: process.env.LOG_HTTP_REQUEST_BODY === 'true',
    logResponseBody: process.env.LOG_HTTP_RESPONSE_BODY === 'true',
    logHeaders: process.env.LOG_HTTP_HEADERS === 'true',
  },
}));
