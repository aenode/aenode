import { globalValidationPipe } from '@aenode/nest-common';
import type { Type } from '@nestjs/common';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap(appModule: Type) {
  const app = await NestFactory.create(appModule);
  const conf = app.get(ConfigService);

  const APP_NAME = conf.getOrThrow<string>('APP_NAME');
  const PORT = conf.getOrThrow<number>('PORT');
  const logger = new Logger(APP_NAME);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.enableShutdownHooks();

  app.useGlobalPipes(globalValidationPipe);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  SwaggerConfig: {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP_NAME)

      .addGlobalParameters({ name: 'x-device-id', in: 'header' })

      .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
      autoTagControllers: true,
    });
    SwaggerModule.setup('docs', app, swaggerDoc, {
      swaggerOptions: {
        persistAuthorization: true,
        responseInterceptor: (response: any) => {
          if (response.url.includes('/auth/login') && response.ok) {
            const token = response.body?.token;

            if (token) {
              localStorage.setItem('token', token);
            }
          }

          return response;
        },
        requestInterceptor: (request: any) => {
          const token = localStorage.getItem('token');

          if (token && !request.url.includes('/auth/login')) {
            request.headers = {
              ...request.headers,
              Authorization: `Bearer ${token}`,
            };
          }

          return request;
        },
      },
    });

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
