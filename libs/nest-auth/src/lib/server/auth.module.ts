import { CryptoModule } from '@aenode/nest-crypto';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';

@Module({
  imports: [
    CryptoModule.register(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const JWT_SECRET = config.get('JWT_KEY', randomBytes(12).toString());
        return {
          global: true,
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: '1m',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
