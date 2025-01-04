import { Provider } from '@nestjs/common';
import { Keycloak } from 'keycloak-connect';

import { KNC_INSTANCE, KNC_OPTIONS } from './protocols/keys';
import { KncConfig } from './protocols/knc-options.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const KeycloakConnect = require('keycloak-connect');

export const createKncOptionProvider = (opts: KncConfig, config?: any) => {
  return {
    provide: KNC_OPTIONS,
    useValue: Object.assign({}, opts, config),
  };
};

export const KncProvider: Provider = {
  provide: KNC_INSTANCE,
  useFactory: async (kncOptions: KncConfig) => {
    try {
      const keycloakInstance: Keycloak = new KeycloakConnect(
        {},
        kncOptions as any,
      );

      // TODO: implement this
      // keycloak.accessDenied = (req: any, res: any, next: any) => {
      //   req.resourceDenied = true;
      //   next();
      // };

      console.log('Keycloak instance initialized!');

      return keycloakInstance;
    } catch (error) {
      console.error('Error initializing Keycloak instance', error);
    }
  },
  inject: [KNC_OPTIONS],
};
