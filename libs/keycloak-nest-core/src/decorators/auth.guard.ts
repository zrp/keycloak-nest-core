import {
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Logger)
    private readonly logger: Logger
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']

    if (!token) {
      this.logger.error('No token provided')
      throw new UnauthorizedException()
    }

    return true
  }
}
