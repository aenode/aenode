import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
  type Type,
} from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/internal';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import helmet from 'helmet';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { getConfig } from './get-config.js';

export async function bootstrap(module: Type): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(module, {});

  const configService = app.get(ConfigService);
  const { APP_ID, APP_ORIGIN, APP_PORT, APP_DESCRIPTION } =
    getConfig(configService);

  app.enableVersioning({ type: VersioningType.URI });

  app.enableCors({
    origin: APP_ORIGIN ?? '*',
    credentials: true,
  } as CorsOptions);

  app.use(
    (
      req: IncomingMessage,
      res: ServerResponse<IncomingMessage>,
      next: (err?: unknown) => void,
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((req as any).path.startsWith('/docs')) {
        return helmet({ contentSecurityPolicy: false })(req, res, next);
      }
      return helmet()(req, res, next);
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false, value: true },
      transformOptions: {
        exposeDefaultValues: true,
        exposeUnsetFields: false,
        excludeExtraneousValues: true,
      },
      exceptionFactory(errors) {
        throw new BadRequestException({ errors });
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_ID)
    .setDescription(APP_DESCRIPTION)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    '/docs',
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
