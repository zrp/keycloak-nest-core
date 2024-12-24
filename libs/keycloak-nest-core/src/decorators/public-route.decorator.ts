import { SetMetadata, applyDecorators } from '@nestjs/common'
import { KNC_SKIP_AUTH } from '../protocols/keys'

export const PublicRoute = () =>
  applyDecorators(SetMetadata(KNC_SKIP_AUTH, true))
