import { Injectable } from '@aenode/nest/common';
import { UserService } from '../user/user.service.js';
import { LoginDto, LoginWithOtpDto } from './login.dto.js';

@Injectable()
export class LoginService {
  constructor(protected readonly userService: UserService) {}

  login(data: LoginDto) {
    return this.userService.findByUsername(data.username);
  }

  loginWithOtp(data: LoginWithOtpDto) {
    return this.userService.findByUsername(data.username);
  }
}
