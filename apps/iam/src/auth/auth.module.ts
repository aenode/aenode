import { ConfigModule, ConfigService } from '@aenode/nest';
import { CryptoModule } from '@aenode/nest-crypto';
import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { LoginController } from './login/login.controller.js';
import { LoginService } from './login/login.service.js';
import { LogoutController } from './login/logout.controller.js';

@Module({
  imports: [
    CryptoModule.register(),
    PrismaModule.forFeature([
      Prisma.ModelName.User,
      Prisma.ModelName.Session,
      Prisma.ModelName.Otp,
    ]),
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
  providers: [LoginService],
})
export class AuthModule {}
