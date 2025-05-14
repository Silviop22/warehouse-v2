import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    schema: process.env.DB_SCHEMA ?? 'public',

    synchronize: false,

    logging:
      process.env.DB_LOGGING === 'true'
        ? ['error', 'warn', 'info', 'query', 'schema']
        : ['error', 'warn', 'schema'],

    cache:
      process.env.DB_CACHE === 'true'
        ? {
            type: process.env.DB_CACHE_TYPE ?? 'database',
            duration: parseInt(process.env.DB_CACHE_DURATION ?? '60000', 10), // 1 minute
            tableName: process.env.DB_CACHE_TABLE ?? 'query_cache',
          }
        : false,

    poolSize: parseInt(
      process.env.DB_POOL_SIZE ?? (isProduction ? '20' : '10'),
      10,
    ),
    minPoolSize: parseInt(
      process.env.DB_MIN_POOL_SIZE ?? (isProduction ? '5' : '2'),
      10,
    ),
    maxPoolSize: parseInt(
      process.env.DB_MAX_POOL_SIZE ?? (isProduction ? '30' : '15'),
      10,
    ),
    connectionTimeoutMillis: parseInt(
      process.env.DB_CONNECTION_TIMEOUT ?? '10000',
      10,
    ),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT ?? '30000', 10),

    extra: {
      max: parseInt(
        process.env.DB_MAX_CONNECTIONS ?? (isProduction ? '30' : '15'),
        10,
      ),

      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT ?? '30000', 10),

      maxUses: parseInt(process.env.DB_MAX_USES ?? '7500', 10),

      idleInTransactionSessionTimeout: parseInt(
        process.env.DB_IDLE_IN_TRANSACTION_TIMEOUT ?? '30000',
        10,
      ),

      statement_timeout: parseInt(
        process.env.DB_STATEMENT_TIMEOUT ?? '30000',
        10,
      ),

      application_name: process.env.APP_NAME ?? 'warehouse-management-system',
    },

    warehouseSpecific: {
      enableAutoLocation: process.env.DB_ENABLE_AUTO_LOCATION === 'true',

      warehouseSchema: process.env.DB_WAREHOUSE_SCHEMA ?? 'warehouse',
    },
  };
});
