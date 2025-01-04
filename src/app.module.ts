import { KncModule, AuthGuard } from '@app/keycloak-nest-core'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envSchema } from './shared/env/env'
import { EnvModule } from './shared/env/env.module'
import { UsersModule } from './users/users.module'
import { PrismaService } from './shared/env/services/prisma.service'
import { APP_GUARD } from '@nestjs/core'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    KncModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          realm: configService.getOrThrow('KEYCLOAK_REALM'),
          serverUrl: configService.getOrThrow('KEYCLOAK_SERVER_URL'),
          clientId: configService.getOrThrow('KEYCLOAK_CLIENT_ID'),
          secret: configService.getOrThrow('KEYCLOAK_CLIENT_SECRET'),
        }
      },
    }),
    EnvModule,
    UsersModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaService, Logger],
})
export class AppModule {}
