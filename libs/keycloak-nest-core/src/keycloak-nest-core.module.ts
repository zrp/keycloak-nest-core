import { Module } from '@nestjs/common';

import { KeycloakNestCoreService } from './keycloak-nest-core.service';

@Module({
  providers: [KeycloakNestCoreService],
  exports: [KeycloakNestCoreService],
})
export class KeycloakNestCoreModule {}
