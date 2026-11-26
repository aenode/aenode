import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppConfigService } from './app-config.service.js';
import { AppController } from './app.controller.js';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AppController],
      providers: [AppConfigService],
    }).compile();

    controller = moduleRef.get(AppController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('info() returns the service name', () => {
    const info = controller.info();
    expect(info.NAME).toBeDefined();
    expect(info.TITLE).toBeDefined();
    expect(info.DESCRIPTION).toBeDefined();
    expect(info.PORT).toBeDefined();
  });
});
