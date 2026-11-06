import { Env } from '@aenode/constants';
import { HashModule } from '@aenode/nest-hash';
import { Module } from '@aenode/nest/common';
import { ConfigModule, ConfigService } from '@aenode/nest/config';
import { EventEmitterModule } from '@aenode/nest/emitter';
import { JwtModule } from '@aenode/nest/jwt';
import { randomBytes } from 'node:crypto';
import { LoginService } from './login/login.service.js';
import { UserService } from './user/user.service.js';

@Module({
  imports: [
    ConfigModule,
    HashModule,
    EventEmitterModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const appName = config.getOrThrow(Env.APP.NAME, 'aenode');
        const secret = config.getOrThrow(
          Env.AUTH.JWT_SECRET,
          randomBytes(32).toBase64(),
        );
        const issuer = config.getOrThrow(Env.AUTH.JWT_ISSUER, appName);
        const audience = config.getOrThrow(Env.AUTH.JWT_AUDIENCE, appName);
        const subject = config.getOrThrow(
          Env.AUTH.JWT_SUBJECT,
          'authentication',
        );

        return {
          global: true,
          secret,
          signOptions: {
            expiresIn: '1h',
            issuer,
            subject,
            audience,
          },
        };
      },
    }),
  ],
  providers: [LoginService, UserService],
  exports: [UserService],
})
export class AuthModule {}
