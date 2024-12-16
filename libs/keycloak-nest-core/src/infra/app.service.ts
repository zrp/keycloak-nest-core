import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getProtected(): { message: string } {
    return { message: 'Protected' }
  }
}
