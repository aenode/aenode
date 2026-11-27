import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(protected readonly config: ConfigService) {}

  get CONFIG() {
    return {
      NAME: this.NAME,
      PORT: this.PORT,
      DESCRIPTION: this.DESCRIPTION,
      TITLE: this.TITLE,
    };
  }

  get NAME() {
    return this.config.get('NAME', 'Iam');
  }

  get PORT() {
    return this.config.get('PORT', 3000);
  }

  get TITLE() {
    return this.config.get(
      'TITLE',
      'Iam (Identity and access management system)',
    );
  }

  get DESCRIPTION() {
    return this.config.get(
      'DESCRIPTION',
      'Manage user credentials, authentication, and autorization',
    );
  }
}
