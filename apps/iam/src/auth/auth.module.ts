import { Env } from '@aenode/constants';
import { EncryptionModule } from '@aenode/nest-encrypt';
import { HashModule } from '@aenode/nest-hash';
import { OtpManagerModule } from '@aenode/nest-otp';
import { Module, type OnModuleInit } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';
import { JwtModule } from '@aenode/nest/jwt';
import { randomBytes } from 'node:crypto';
import {
  OtpDataModule,
  SessionDataModule,
  UserDataModule,
  UserService,
} from '../data/index.js';
import { AuthUser } from './auth-user.js';
import { AuthService } from './auth.service.js';
import { LoginControler } from './login/login.controller.js';
import { LoginService } from './login/login.service.js';

@Module({
  imports: [
    EncryptionModule.register(),
    OtpManagerModule,
    HashModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const secret = config.get(Env.AUTH.JWT_SECRET, randomBytes(32));
        const issuer = config.get(Env.AUTH.JWT_ISSUER, 'aenode');
        const audience = config.get(Env.AUTH.JWT_AUDIENCE, 'aenode');
        return {
          global: true,
          secret,

          signOptions: {
            issuer,
            audience,
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
export class AuthModule implements OnModuleInit {
  constructor(
    protected readonly config: ConfigService,
    protected readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const ROOT_USERNAME = this.config.getOrThrow(Env.AUTH.ROOT_USERNAME);
    const ROOT_PASSWORD = this.config.getOrThrow(Env.AUTH.ROOT_PASSWORD);

    await this.userService.upsertOneByUsername({
      username: ROOT_USERNAME,
      password: ROOT_PASSWORD,
    });
    const rootUser =
      await this.userService.findUniqueOneByUsername(ROOT_USERNAME);
    console.log(rootUser);

    const foundUsers = await this.userService.findManyUsersWithRelations();
    AuthUser.loadUsers(...foundUsers);
  }
}
