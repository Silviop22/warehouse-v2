import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Joi from 'joi';
import databaseConfig from './config/database.config';
import loggerConfig from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, loggerConfig],
      expandVariables: true,
      cache: true,

      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'staging')
          .default('development'),
        PORT: Joi.number().default(8080),
        API_PREFIX: Joi.string().default('api'),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_POOL_SIZE: Joi.number().default(10),
        DB_IDLE_TIMEOUT: Joi.number().default(30000),

        LOG_LEVEL: Joi.string()
          .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
          .default('info'),
        LOG_FORMAT: Joi.string().valid('json', 'pretty').default('pretty'),
      }),
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
