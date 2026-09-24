import type { Type } from '@nestjs/common';
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { ValiationErrorDto } from '../dtos/common.js';

export async function bootstrap(appModule: Type) {
  const app = await NestFactory.create(appModule);
  const conf = app.get(ConfigService);

  const APP_NAME = conf.getOrThrow<string>('APP_NAME');
  const PORT = conf.getOrThrow<number>('PORT');
  const logger = new Logger(APP_NAME);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
        exposeDefaultValues: false,
        exposeUnsetFields: false,
      },
      exceptionFactory(validationErrors) {
        const errors = validationErrors.flatMap((error) => {
          return Object.entries(error.constraints ?? {}).map(
            ([constraint, message]) => {
              return {
                property: error.property,
                constraint,
                message,
              } as ValiationErrorDto;
            },
          );
        });
        throw new UnprocessableEntityException({ errors });
      },
    }),
  );

  SwaggerConfig: {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP_NAME)
      .addBearerAuth()
      .build();
    const swaggerDog = SwaggerModule.createDocument(app, swaggerConfig, {
      autoTagControllers: true,
    });
    SwaggerModule.setup('docs', app, swaggerDog, {});

    break SwaggerConfig;
  }

  Start: {
    await app.listen(PORT);
    const URL = await app.getUrl();
    logger.log(`${APP_NAME} app is runing at ${URL}`);
    logger.log(`${APP_NAME} swagger is runing at ${URL}/docs`);
    break Start;
  }
}
