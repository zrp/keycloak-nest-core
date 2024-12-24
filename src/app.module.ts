import { KncModule, AuthGuard } from '@app/keycloak-nest-core'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

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
    KncModule.register({
      authServerUrl: 'http://keycloak:8080/auth',
      realm: 'KNC',
      clientId: 'keycloak-nest-core',
      credentials: {
        secret: 'pAWDwJxpfSx5Kt9cGLUExynwk9cIakEw',
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
