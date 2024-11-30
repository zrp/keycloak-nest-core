import { Controller, Get, Inject } from '@nestjs/common';
import { KncService } from '@root/libs/keycloak-nest-core/src';

import { AppService } from './app.service';
import { KNC_INSTANCE } from '@root/libs/keycloak-nest-core/src/protocols/keys';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(KNC_INSTANCE)
    private readonly keycloakService: KncService,
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
