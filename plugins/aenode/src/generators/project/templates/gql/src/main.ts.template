import { ConfigService, Logger, NestFactory } from '@aenode/nestjs';
import { DocumentBuilder, SwaggerModule } from '@aenode/nestjs/swagger';
import { MainModule } from './app/main.module.js';

function config(configService: ConfigService) {
  const env = (key: string, defaultValue?: string | number) =>
    configService.getOrThrow(key, defaultValue);
  const APP_ID = env('APP_ID');
  const PORT = env('PORT', 3000);
  return {
    APP_ID,
    PORT,
  };
}
export async function main() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(MainModule, { logger: ['verbose'] });

  const { APP_ID, PORT } = config(app.get(ConfigService));

  {
    app.setGlobalPrefix('api');
    app.enableCors();
    app.enableShutdownHooks();
  }

  {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP_ID)
      .addBearerAuth()
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
      autoTagControllers: true,
      deepScanRoutes: true,
    });

    SwaggerModule.setup('api', app, swaggerDoc);
  }

  {
    await app.listen(PORT);
    const url = await app.getUrl();
    logger.log(`${APP_ID} is up and running at ${url}`);
    logger.log(`${APP_ID} apollo is up and running at ${url}/graphql`);
    logger.log(`${APP_ID} swagger is up and running at ${url}/api`);
  }
}
