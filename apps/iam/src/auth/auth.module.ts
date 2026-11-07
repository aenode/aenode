import { Env } from '@aenode/constants';
import { EncryptionModule } from '@aenode/nest-encrypt';
import { OtpManagerModule } from '@aenode/nest-otp';
import { Module } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';
import { JwtModule } from '@aenode/nest/jwt';
import { randomBytes } from 'node:crypto';
import {
  OtpDataModule,
  SessionDataModule,
  UserDataModule,
} from '../data/index.js';
import { AuthService } from './auth.service.js';
import { LoginControler } from './login/login.controller.js';
import { LoginService } from './login/login.service.js';

@Module({
  imports: [
    EncryptionModule,
    OtpManagerModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const secret = config.get(Env.AUTH.JWT_SECRET, randomBytes(32));
        const issuer = config.get(Env.AUTH.JWT_ISSUER, 'aenode');
        const subject = config.get(Env.AUTH.JWT_SUBJECT, 'authentication');
        const audience = config.get(Env.AUTH.JWT_AUDIENCE, 'aenode');
        return {
          global: true,
          secret,

          signOptions: {
            issuer,
            audience,
            subject,
          },
        };
      },
    }),
    UserDataModule,
    SessionDataModule,
    OtpDataModule,
  ],
  controllers: [LoginControler],
  providers: [AuthService, LoginService],
})
export class AuthModule {}
