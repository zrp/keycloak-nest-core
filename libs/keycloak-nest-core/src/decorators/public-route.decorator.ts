import { SetMetadata, applyDecorators } from '@nestjs/common'

export const KNC_SKIP_AUTH = 'skip-auth'

/**
 * Allow user to use unprotected routes.
 * @since 1.2.0
 * @param skipAuth attaches authorization header to user object when `false`, defaults to `true`
 */
export const PublicRoute = (skipAuth = true) =>
  applyDecorators(SetMetadata(KNC_SKIP_AUTH, skipAuth))
