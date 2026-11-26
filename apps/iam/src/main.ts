import '@nestjs/platform-express';
//
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './app/app-config.service.js';
import { AppModule } from './app/app.module.js';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { NAME, TITLE, DESCRIPTION, PORT } = app.get(AppConfigService);
  const logger = new Logger(NAME);

  app.setGlobalPrefix('api', { exclude: ['health/{*path}'] });

  {
    const swaggerConfig = new DocumentBuilder().addBearerAuth().setTitle(TITLE).setDescription(DESCRIPTION).build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, { autoTagControllers: true });
    SwaggerModule.setup('docs', app, swaggerDoc);
  }

  app.enableShutdownHooks();
  app.enableCors({ origin: '*' });

  await app.listen(PORT);

  logger.log(`up and running at ${await app.getUrl()}`);
}

main();
