import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common'

import { AppService } from './app.service'
import { LoginRequestDto } from './protocols/login.request.dto'
import { PublicRoute } from '@app/keycloak-nest-core'
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('protected')
  getProtected(): { message: string } {
    return { message: 'Protected route' }
  }

  @Post('login')
  @PublicRoute()
  login(@Body() body: LoginRequestDto) {
    return this.appService.login(body)
  }
}
