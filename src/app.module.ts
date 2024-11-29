import { KncModule } from '@app/keycloak-nest-core'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envSchema } from './shared/env/env'
import { EnvModule } from './shared/env/env.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    KncModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'nest-example',
      clientId: 'nest-api',
      credentials: {
        secret: '05c1ff5e-f9ba-4622-98e3-c4c9d280546e',
      },
    }),
    EnvModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
