import { bootstrap } from '@aenode/nest';
import { AppModule } from './app/app.module.js';
import { PrismaExceptionFilter } from './app/filters/prisma-exception.filter.js';

bootstrap({ module: AppModule, filters: [PrismaExceptionFilter] });
