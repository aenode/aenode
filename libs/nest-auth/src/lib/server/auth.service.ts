import { CryptoService } from '@aenode/nest-crypto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserService } from './auth-user.service.js';
import type { AuthUserDto } from './dtos/auth-user.dto.js';
import { LoginDto } from './dtos/login.dto.js';

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

  async login(data: LoginDto) {
    const found = await this.findUserByUsername(data.username);

    const isVerified = await this.crytoService.verifyHash(
      found.password,
      data.password,
    );

    if (isVerified) {
      const token = await this.jwtService.signAsync({ sub: found.uuid });
      return { token };
    }
    throw new UnauthorizedException('Invalid jwt token');
  }
}
