// decorators.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserValidationPipe } from './user-validation.pipe'

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user
})

export const GetValidatedUser = (additionalOptions?: any) =>
  GetUser(additionalOptions, UserValidationPipe)
