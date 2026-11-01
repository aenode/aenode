#!/usr/bin/env node

import { boot } from '@aenode/nest-boot';
import { AppModule } from './app/app.module.ts';

boot({ module: AppModule });
