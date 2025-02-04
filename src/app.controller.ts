import { AuthorizedClients, PublicRoute } from '@app/keycloak-nest-core';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { LoginRequestDto } from './protocols/login.request.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@AuthorizedClients(['keycloak-nest-core'])
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  getProtected(): { message: string } {
    return { message: 'Protected route' };
  }

  @PublicRoute()
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.appService.login(body);
  }
}
