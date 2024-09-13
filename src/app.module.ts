import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './shared/env/env';
import { EnvModule } from './shared/env/env.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: env => envSchema.parse(env),
            isGlobal: true,
        }),
        EnvModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
