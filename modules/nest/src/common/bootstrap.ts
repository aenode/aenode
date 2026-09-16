import {
  ClassSerializerInterceptor,
  Logger,
  VersioningType,
  type CanActivate,
  type ExceptionFilter,
  type NestInterceptor,
  type NestMiddleware,
  type Type,
  type ValidationPipe,
} from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/internal';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import type { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { globalValidationPipe } from '../validation/global-validation.pipe.js';
import { getConfig } from './get-config.js';

export type BootstrapOptions = {
  module: Type;
  filters?: Type<ExceptionFilter>[];
  middlewares?: Type<NestMiddleware>[];
  pipes?: Type<ValidationPipe>[];
  interceptors?: Type<NestInterceptor>[];
  guards?: Type<CanActivate>[];
};
export async function bootstrap(options: BootstrapOptions): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    options.module,
    {},
  );

  const configService = app.get(ConfigService);
  const {
    APP_ID,
    APP_ORIGIN,
    APP_PORT,
    APP_DESCRIPTION,
    APP_PREFIX,
    APP_DOCS,
  } = getConfig(configService);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.setGlobalPrefix(APP_PREFIX);
  app.enableCors({
    origin: APP_ORIGIN ?? '*',
    credentials: true,
  } as CorsOptions);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith(APP_DOCS)) {
      return helmet({ contentSecurityPolicy: false })(req, res, next);
    }
    return helmet()(req, res, next);
  });

  app.useGlobalPipes(globalValidationPipe);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector, { strict: true })),
  );

  if (options.interceptors) {
    app.useGlobalInterceptors(...options.interceptors.map((v) => app.get(v)));
  }

  if (options.middlewares) {
    app.use(...options.middlewares.map((v) => new v()));
  }

  if (options.filters) {
    app.useGlobalFilters(...options.filters.map((v) => new v()));
  }
  if (options.pipes) {
    app.useGlobalPipes(...options.pipes.map((v) => new v()));
  }

  if (options.guards) {
    app.useGlobalGuards(...options.guards.map((v) => new v()));
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_ID)
    .setDescription(APP_DESCRIPTION)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(APP_DOCS, apiReference({ content: swaggerDoc }));

  app.enableShutdownHooks();

  const logger = new Logger(APP_ID);
  await app.listen(APP_PORT);
  const URL = await app.getUrl();

  logger.log(`App is up and running at ${URL}/docs`);
}
