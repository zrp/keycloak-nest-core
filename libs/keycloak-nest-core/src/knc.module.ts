import { DynamicModule, Logger, Module } from '@nestjs/common'

import { createKncOptionProvider, KncProvider } from './knc-connect.provider'
import { KeycloakConnectConfig } from './protocols/knc-options.type'

@Module({})
export class KncModule {
  static register(options: KeycloakConnectConfig, config?: any): DynamicModule {
    const keycloakConnectProviders = [
      createKncOptionProvider(options, config),
      KncProvider,
      Logger,
    ]

    return {
      module: KncModule,
      providers: keycloakConnectProviders,
      exports: keycloakConnectProviders,
    }
  }
}
