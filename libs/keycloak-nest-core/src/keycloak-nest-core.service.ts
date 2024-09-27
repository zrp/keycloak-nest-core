import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakNestCoreService {
  getProtected(): { message: string } {
    return { message: 'Protected' };
  }
}
