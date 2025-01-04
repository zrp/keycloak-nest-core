import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

import { LoginRequestDto } from './protocols/login.request.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(body: LoginRequestDto) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.configService.getOrThrow('KEYCLOAK_AUTH_SERVER_URL_TOKEN')}/protocol/openid-connect/token`,
        {
          client_id: this.configService.getOrThrow('KEYCLOAK_CLIENT_ID'),
          client_secret: this.configService.getOrThrow(
            'KEYCLOAK_CLIENT_SECRET',
          ),
          grant_type: 'password',
          scope: 'openid',
          username: body.username,
          password: body.password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.response?.status);
      }

      throw new InternalServerErrorException('Error logging in');
    }
  }
}
