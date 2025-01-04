import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';

import { createKncOptionProvider, KncProvider } from './knc-connect.provider';
import {
  KncModuleAsyncOptions,
  KncOptionsFactory,
} from './protocols/async-options.type';
import { KNC_OPTIONS } from './protocols/keys';
import { KncConfig } from './protocols/knc-options.type';

@Module({})
export class KncModule {
  static register(options: KncConfig, config?: any): DynamicModule {
    const keycloakConnectProviders = [
      createKncOptionProvider(options, config),
      KncProvider,
      Logger,
    ];

    return {
      module: KncModule,
      providers: keycloakConnectProviders,
      exports: keycloakConnectProviders,
    };
  }

  static registerAsync(options: KncModuleAsyncOptions): DynamicModule {
    const optsProvider = this.createAsyncProviders(options);

    return {
      module: KncModule,
      imports: options.imports || [],
      providers: optsProvider,
      exports: optsProvider,
    };
  }

  private static createAsyncProviders(
    options: KncModuleAsyncOptions,
  ): Provider[] {
    const reqProviders = [
      this.createAsyncOptionsProvider(options),
      KncProvider,
    ];

    if (options.useExisting || options.useFactory) {
      return reqProviders;
    }

    return [
      ...reqProviders,
      {
        provide: KNC_OPTIONS,
        useClass: options.useClass!,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: KncModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KNC_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const injectToken = options.useExisting || options.useClass;

    if (!injectToken) {
      throw new Error(
        'Invalid configuration. Either useFactory, useClass, or useExisting must be provided.',
      );
    }

    return {
      provide: KNC_OPTIONS,
      useFactory: async (optionsFactory: KncOptionsFactory) =>
        await optionsFactory.createKeycloakConnectOptions(),
      inject: [injectToken],
    };
  }
}
