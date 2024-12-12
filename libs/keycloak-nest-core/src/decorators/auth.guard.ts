import {
  Injectable,
  CanActivate,
  Inject,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import KeycloakConnect from 'keycloak-connect';
import { KNC_INSTANCE } from '../protocols/keys';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(KNC_INSTANCE)
    private singleTenant: KeycloakConnect.Keycloak,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
