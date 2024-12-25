const KeycloakConnect = require('keycloak-connect')
import { Provider } from '@nestjs/common'

import { KNC_INSTANCE, KNC_LOGIN, KNC_OPTIONS } from './protocols/keys'
import { KeycloakConnectConfig } from './protocols/knc-options.type'
import { Keycloak } from 'keycloak-connect'
import { HttpService } from '@nestjs/axios'

export const createKncOptionProvider = (
  opts: KeycloakConnectConfig,
  config?: any
) => {
  return {
    provide: KNC_OPTIONS,
    useValue: Object.assign({}, opts, config),
  }
}

export const KncProvider: Provider = {
  provide: KNC_INSTANCE,
  useFactory: async (kncOptions: KeycloakConnectConfig) => {
    try {
      const keycloakInstance: Keycloak = new KeycloakConnect(
        {},
        kncOptions as any
      )

      // TODO: implement this
      // keycloak.accessDenied = (req: any, res: any, next: any) => {
      //   req.resourceDenied = true;
      //   next();
      // };

      console.log('Keycloak instance initialized!')

      return keycloakInstance
    } catch (error) {
      console.error('Error initializing Keycloak instance', error)
    }
  },
  inject: [KNC_OPTIONS],
}
