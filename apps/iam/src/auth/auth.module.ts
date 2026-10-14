import { ConfigModule, ConfigService } from '@aenode/nest';
import { CryptoModule } from '@aenode/nest-crypto';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  OtpDataModule,
  PermissoinDataModule,
  RoleDataModule,
  SessionDataModule,
  UserDataModule,
  UserRoleDataModule,
} from '../data/index.js';
import { LoginController } from './controllers/login.controller.js';
import { LogoutController } from './controllers/logout.controller.js';
import { Otp2FAController } from './controllers/otp-2fa.controller.js';
import { AuthCacheService } from './services/auth-cache.service.js';
import { LoginService } from './services/login.service.js';
import { RequestService } from './services/request.service.js';

@Module({
  imports: [
    CryptoModule.register(),
    UserDataModule,
    RoleDataModule,
    PermissoinDataModule,
    OtpDataModule,
    UserRoleDataModule,
    SessionDataModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const JWT_SECRET = config.getOrThrow('JWT_KEY');
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
  controllers: [LoginController, LogoutController, Otp2FAController],
  providers: [LoginService, RequestService, AuthCacheService],
  exports: [JwtModule, LoginService, RequestService, AuthCacheService],
})
export class AuthModule {
  constructor(protected readonly authCacheService: AuthCacheService) {}
  async onModuleInit() {
    this.authCacheService.loadCache();
  }
}
