import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakNestCoreService {
  getProtected(): string {
    return 'Protected';
  }
}
