import { DynamicModule, Module } from '@nestjs/common'

import { KncConnectProvider } from './knc-connect.provider'
import { KncService } from './knc.service'
import { KeycloakConnectConfig } from './protocols/knc-options.type'

@Module({})
export class KncModule {
  static register(options: KeycloakConnectConfig): DynamicModule {
    const keycloakConnectProviders = [KncConnectProvider, KncService]

    return {
      module: KncModule,
      providers: keycloakConnectProviders,
      exports: keycloakConnectProviders,
    }
  }
}
