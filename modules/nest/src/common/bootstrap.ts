import { Logger, type Type } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/internal';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import helmet from 'helmet';
import { getConfig } from './get-config.js';

export async function bootstrap(module: Type): Promise<void> {
  const app = await NestFactory.create(module, {});

  const configService = app.get(ConfigService);
  const { APP_ID, APP_ORIGIN, APP_PORT, APP_DESCRIPTION } =
    getConfig(configService);

  app.enableVersioning();
  app.enableCors({
    origin: APP_ORIGIN ?? '*',
    credentials: true,
  } as CorsOptions);

  app.use(helmet());

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

  const logger = new Logger(APP_ID);
  await app.listen(APP_PORT);
  const URL = await app.getUrl();

  logger.log(`App is up and running at ${URL}`);
}
