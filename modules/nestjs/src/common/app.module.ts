import { CacheInterceptor } from '@nestjs/cache-manager';
import { Module, type DynamicModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common.module.js';
import { provdeGlobalInputValidationPipe } from './global-validation-pipe.js';

@Module({
  imports: [CommonModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    provdeGlobalInputValidationPipe(),
  ],
})
export class AppModule {
  static register(options: Omit<DynamicModule, 'module'>): DynamicModule {
    return {
      ...options,
      module: AppModule,
    };
  }
}
