import { ModuleMetadata, Type } from '@nestjs/common'
import { KncConfig } from './knc-options.type'

export interface KncOptionsFactory {
  createKeycloakConnectOptions(): Promise<KncConfig> | KncConfig
}

export interface KncModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useExisting?: Type<KncOptionsFactory>
  useClass?: Type<KncOptionsFactory>
  useFactory?: (...args: any[]) => Promise<KncConfig> | KncConfig
}
