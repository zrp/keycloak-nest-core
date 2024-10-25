import { Injectable, Provider } from '@nestjs/common'
import KeycloakConnect from 'keycloak-connect'

import { KEYCLOAK_INSTANCE, KEYCLOAK_OPTIONS } from './protocols/keys'
import { KeycloakConnectConfig } from './protocols/knc-options.type'

@Injectable()
export class KncConnectProvider {
  static getKeycloakConnect(): Provider {
    return {
      provide: KEYCLOAK_INSTANCE,
      useFactory: (kncOptions: KeycloakConnectConfig) => {
        const keycloakInstance = new KeycloakConnect({}, kncOptions as any)

        // TODO: implement this
        // keycloak.accessDenied = (req: any, res: any, next: any) => {
        //   req.resourceDenied = true;
        //   next();
        // };

        return keycloakInstance
      },
      inject: [KEYCLOAK_OPTIONS],
    }
  }
}
