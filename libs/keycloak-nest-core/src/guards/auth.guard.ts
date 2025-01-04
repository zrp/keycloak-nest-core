import {
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { KNC_INSTANCE, KNC_OPTIONS, KNC_SKIP_AUTH } from '../protocols/keys'
import { Keycloak } from 'keycloak-connect'
import { Reflector } from '@nestjs/core'
import { KncContentToken, KncToken } from '../protocols/knc-content-token.type'
import { KeycloakConnectConfig } from '../protocols/knc-options.type'

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Logger)
    private readonly logger: Logger,
    @Inject(KNC_INSTANCE)
    private readonly keycloak: Keycloak,
    @Inject(KNC_OPTIONS)
    private readonly kncOptions: KeycloakConnectConfig,
    private readonly reflector: Reflector
  ) {}

  private isPublicRoute(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      KNC_SKIP_AUTH,
      context.getHandler()
    )
    return !!isPublic
  }

  private extractJwt(headers: { [key: string]: string }) {
    if (headers && !headers.authorization) {
      this.logger.error(`[KNC]: No authorization header`)
      throw new UnauthorizedException()
    }

    const auth = headers.authorization.split(' ')

    if (auth[0].toLowerCase() !== 'bearer') {
      this.logger.error(`[KNC]: No bearer token provided`)
      throw new UnauthorizedException()
    }

    return auth[1]
  }

  async validateKeycloakToken(token: any): Promise<KncContentToken> {
    try {
      const result = (await this.keycloak.grantManager.createGrant({
        access_token: token,
      })) as unknown as KncToken

      return result.access_token.content
    } catch (error) {
      this.logger.error(`[KNC]: ${error}`)
      throw new UnauthorizedException()
    }
  }

  async validateToken(context: ExecutionContext): Promise<KncContentToken> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractJwt(request.headers)

    if (!token) {
      this.logger.error('[KNC]: No token provided')
      throw new UnauthorizedException()
    }

    const result = await this.validateKeycloakToken(token)

    return result
  }

  injectContentToken(context: ExecutionContext, contentToken: KncContentToken) {
    const tokenData = this.kncOptions.tokenDataProperty || 'tokenData'
    const request = context.switchToHttp().getRequest()
    request[tokenData] = contentToken
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.isPublicRoute(context)

    if (isPublicRoute) {
      return true
    }

    const contentToken = await this.validateToken(context)
    this.injectContentToken(context, contentToken)

    return true
  }
}
