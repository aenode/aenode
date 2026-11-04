import { Env } from '@aenode/constants';
import { Logger, type Type } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';
import { NestFactory } from '@aenode/nest/core';
import { DocumentBuilder, SwaggerModule } from '@aenode/nest/swagger';

import { globalValidationPipe } from '@aenode/prop';
export type BootOptions = {
  module: Type;
};

export async function boot(options: BootOptions) {
  const app = await NestFactory.create({ module: options.module });

  const config = app.get(ConfigService);

  const profile = config.get<string>(Env.APP.PROFILE);
  const hasProfile = !!profile;
  const env = hasProfile ? new Env(profile) : Env;

  const get = <T>(key: string, defaultValue?: T) => {
    if (defaultValue !== undefined) {
      return config.getOrThrow<T>(key, defaultValue);
    } else {
      return config.getOrThrow(key);
    }
  };

  const appName = get<string>(env.APP.NAME, env.APP.NAME);
  const logger = new Logger(`${appName}(${profile ?? 'default'})`);

  const description = get<string>(env.APP.DESCRIPTION, env.APP.DESCRIPTION);
  const port = get<number>(env.APP.PORT, 3000);
  const allowedOrigins = get<string>(env.AUTH.ALLOWED_ORIGINS, '*');
  const apiPrefix = get<string>(env.APP.API_PREFIX, 'api');

  const authProfile = get<string>(env.AUTH.AUTH_PROFILE, 'secured');

  const isPublicProfile = /public/gi.test(authProfile);

  app.enableCors({ origins: [allowedOrigins.split(',')] });
  app.setGlobalPrefix(apiPrefix);
  app.enableShutdownHooks();

  app.useGlobalPipes(globalValidationPipe);

  swaggerIntegration: {
    const swaggerConfig = new DocumentBuilder();
    swaggerConfig.setTitle(appName).setDescription(description);

    if (!isPublicProfile) {
      swaggerConfig.addBearerAuth();
    }

    const swaggerDoc = SwaggerModule.createDocument(
      app,
      swaggerConfig.build(),
      {
        autoTagControllers: true,
      },
    );

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    break swaggerIntegration;
  }

  await app.listen(port);
  const url = await app.getUrl();

  logger.log(`public profile status : ${isPublicProfile}`);
  logger.log(`allowed origins       : ${allowedOrigins}`);
  logger.log(`running at ${url}`);
  logger.log(`swagger at ${url}/docs`);
}
