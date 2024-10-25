import { Controller, Get } from '@nestjs/common'
import { KncService } from '@root/libs/keycloak-nest-core/src'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly keycloakService: KncService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('protected')
  getProtected(): { message: string } {
    return this.keycloakService.getProtected()
  }
}
