import '@nestjs/platform-express';
//
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module.js';

async function main() {
  const logger = new Logger('Iam');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>('PORT', 5000);

  // Configure Swagger
  {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Iam (Identity and access management system)')
      .setDescription('Manage user credentials, authentication, and autorization')
      .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, { autoTagControllers: true });
    SwaggerModule.setup('docs', app, swaggerDoc);
  }

  app.enableShutdownHooks();
  app.enableCors({ origin: '*' });

  await app.listen(port);

  logger.log(`up and running at ${await app.getUrl()}`);
}

main();
