#!/usr/bin/env node

import '@aenode/contact-db';
import { boot } from '@aenode/nest-boot';
import { AppModule } from './app/app.module.js';
boot({ module: AppModule });
