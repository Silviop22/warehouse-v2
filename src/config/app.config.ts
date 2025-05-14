import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV ?? 'development',
  name: process.env.APP_NAME ?? 'Warehouse Management System',
  version: process.env.npm_package_version ?? '1.0.0',

  host: process.env.APP_HOST ?? 'localhost',
  port: parseInt(process.env.PORT ?? '8080', 10),

  api: {
    prefix: process.env.API_PREFIX ?? 'warehouse/api',
    version: process.env.API_VERSION ?? 'v1',
  },

  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
    origin: (process.env.CORS_ORIGIN ?? '*').split(','),
    methods: (
      process.env.CORS_METHODS ?? 'GET,HEAD,PUT,PATCH,POST,DELETE'
    ).split(','),
  },
}));
