import { KncModule, AuthGuard } from '@app/keycloak-nest-core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema } from './shared/env/env';
import { EnvModule } from './shared/env/env.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './shared/env/services/prisma.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    KncModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'knc-realm',
      clientId: 'knc-client',
      credentials: {
        secret: '91qrRt1FU75jqLd3QfETZkmUDWK4OEyf',
      },
    }),
    EnvModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
