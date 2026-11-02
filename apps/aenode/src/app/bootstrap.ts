import { boot } from '@aenode/nest-boot';
import { AppModule } from './app.module.js';

export async function bootstrap() {
  boot({ module: AppModule });
}
