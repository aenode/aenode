import { CryptoService } from '@aenode/nest-crypto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserService } from './auth-user.service.js';
import type { AuthUserDto } from './dtos/auth-user.dto.js';
import type { Enable2FAResponseDto } from './dtos/enable-2fa-response.dto.js';
import type { LoginWithOTPDto } from './dtos/login-with-otp.dto.js';
import { LoginDto } from './dtos/login.dto.js';
import type { ResetPasswordDto } from './dtos/reset-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: AuthUserService,
    protected readonly jwtService: JwtService,
    protected readonly crytoService: CryptoService,
  ) {}

  protected async findUserByUsername(username: string): Promise<AuthUserDto> {
    const found = await this.userService.findByUsername(username);

    if (!found) {
      throw new NotFoundException(`User not found by ${username}`);
    }

    return found;
  }

  protected async signToken(sub: string) {
    const token = await this.jwtService.signAsync({ sub });
    return { token };
  }

  async login(data: LoginDto) {
    const found = await this.findUserByUsername(data.username);

    const isVerified = await this.crytoService.verifyHash(
      found.password,
      data.password,
    );

    if (isVerified) {
      return await this.signToken(found.uuid);
    }
    throw new UnauthorizedException('Invalid jwt token');
  }

  async logout(userId: number) {
    return { message: `bye, ${userId}` };
  }

  async loginWithOTP(data: LoginWithOTPDto) {
    const found = await this.findUserByUsername(data.username);

    const isVerified = await this.crytoService.verifyOtp(
      data.otp,
      found.otpSecret,
    );

    if (isVerified) {
      return await this.signToken(found.uuid);
    }

    throw new UnauthorizedException('Invalid OTP');
  }

  async resetPassword(data: ResetPasswordDto, uuid: string) {
    return await this.userService.updatePasswordByUuid(uuid, data);
  }

  async enable2FA(username: string): Promise<Enable2FAResponseDto> {
    const secret = await this.crytoService.generateOtpSecret();
    await this.userService.updateOtpSecretByUsername(username, secret);
    const uri = await this.crytoService.generateOtpUri(secret, username);
    const data = await this.crytoService.generateOtpQrCode(uri);
    return { data };
  }
}
