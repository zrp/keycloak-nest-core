import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  SetMetadata,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { KNC_AUTHORIZED_CLIENTS, KNC_SKIP_AUTH } from '../protocols/keys';

@Injectable()
export class AuthorizedClientsInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skipAuth = this.reflector.get<boolean>(
      KNC_SKIP_AUTH,
      context.getHandler(),
    );
    if (skipAuth) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();
    const authorizedBy = req.tokenData?.azp;
    const authorizedClients = this.reflector.get<string[]>(
      KNC_AUTHORIZED_CLIENTS,
      context.getClass(),
    );

    if (!authorizedClients.includes(authorizedBy)) {
      this.logger.error(`[KNC]: Unauthorized keycloak client`);
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}

export const AuthorizedClients = (clients: string[]) =>
  applyDecorators(
    SetMetadata(KNC_AUTHORIZED_CLIENTS, clients),
    UseInterceptors(AuthorizedClientsInterceptor),
  );
