import { Injectable } from '@nestjs/common'
import { LoginRequestDto } from './protocols/login.request.dto'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  async login(body: LoginRequestDto) {
    return body
  }
}
