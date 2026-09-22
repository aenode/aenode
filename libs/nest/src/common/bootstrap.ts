import type { Type } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap(appModule: Type) {
  const app = await NestFactory.create(appModule);
  const conf = app.get(ConfigService);

  const APP_NAME = conf.get<string>('APP_NAME', 'Unkown');
  const PORT = conf.get<number>('PORT', 3000);

  const logger = new Logger(APP_NAME);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.enableShutdownHooks();

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
    break Start;
  }
}
