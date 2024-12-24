import {
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { KNC_INSTANCE } from '../protocols/keys'
import { Keycloak } from 'keycloak-connect'
import { KNC_SKIP_AUTH } from '../decorators/public-route.decorator'
import { Reflector } from '@nestjs/core'

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Logger)
    private readonly logger: Logger,
    @Inject(KNC_INSTANCE)
    private readonly keycloak: Keycloak,
    private readonly reflector: Reflector
  ) {}

  private isPublicRoute(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      KNC_SKIP_AUTH,
      context.getHandler()
    )
    return isPublic
  }

  private extractJwt(headers: { [key: string]: string }) {
    if (headers && !headers.authorization) {
      this.logger.error(`No authorization header`)
      throw new UnauthorizedException()
    }

    const auth = headers.authorization.split(' ')

    if (auth[0].toLowerCase() !== 'bearer') {
      this.logger.error(`No bearer token provided`)
      throw new UnauthorizedException()
    }

    return auth[1]
  }

  async validateKeycloakToken(token: any) {
    try {
      await this.keycloak.grantManager.createGrant({ access_token: token })
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedException()
    }
  }

  async validateToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = this.extractJwt(request.headers)

    if (!token) {
      this.logger.error('No token provided')
      throw new UnauthorizedException()
    }

    await this.validateKeycloakToken(token)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.isPublicRoute(context)

    if (isPublicRoute) {
      return true
    }

    await this.validateToken(context)

    return true
  }
}
