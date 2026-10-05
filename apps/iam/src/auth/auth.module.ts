import { ConfigModule, ConfigService } from '@aenode/nest';
import { CryptoModule } from '@aenode/nest-crypto';
import { Module, type OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';
import {
  OtpDataModule,
  RoleDataModule,
  SessionDataModule,
  UserDataModule,
  UserService,
} from '../data/index.js';
import { LoginController } from './login/login.controller.js';
import { LoginService } from './login/login.service.js';
import { LogoutController } from './login/logout.controller.js';
import { SessionCacheService } from './session-cache.service.js';

@Module({
  imports: [
    CryptoModule.register(),
    UserDataModule,
    RoleDataModule,
    OtpDataModule,
    SessionDataModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const JWT_SECRET = config.get('JWT_KEY', randomBytes(12).toString());
        return {
          global: true,
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: '1y',
          },
        };
      },
    }),
  ],
  controllers: [LoginController, LogoutController],
  providers: [LoginService, SessionCacheService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    protected readonly config: ConfigService,
    protected readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const username = this.config.get('ROOT_USERNAME', 'aenode+root@aenode.io');
    const password = this.config.get('ROOT_PASSWORD', '!Password123.');

    const found = await this.userService.findUniqueOneByUsername(username);

    if (found) {
      await this.userService.updateOneById(found.id, { password });
    } else {
      await this.userService.createOne({ username, password });
    }
  }
}
