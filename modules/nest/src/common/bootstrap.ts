import {
  ClassSerializerInterceptor,
  Logger,
  VersioningType,
  type Type,
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

export async function bootstrap(module: Type): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(module, {});

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

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_ID)
    .setDescription(APP_DESCRIPTION)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    APP_DOCS,
    apiReference({
      content: swaggerDoc,
    }),
  );

  app.enableShutdownHooks();

  const logger = new Logger(APP_ID);
  await app.listen(APP_PORT);
  const URL = await app.getUrl();

  logger.log(`App is up and running at ${URL}/docs`);
}
