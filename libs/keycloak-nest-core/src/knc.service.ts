import { Injectable } from '@nestjs/common'

@Injectable()
export class KncService {
  getProtected(): { message: string } {
    return { message: 'Protected route!' }
  }
}
