import { Controller, Get } from '@nestjs/common';
import { KeycloakNestCoreService } from '@root/libs/keycloak-nest-core/src';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly keycloakService: KeycloakNestCoreService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  getProtected(): { message: string } {
    return this.keycloakService.getProtected();
  }
}
