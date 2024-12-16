import {
  Injectable,
  Logger,
  PipeTransform,
  Scope,
  UnauthorizedException,
} from '@nestjs/common'
import { GetUserByUsernameUseCase } from '@root/libs/keycloak-nest-core/src/domain/base/application/use-cases/get-user-by-username'

@Injectable({ scope: Scope.REQUEST })
export class UserValidationPipe implements PipeTransform {
  private readonly logger = new Logger(UserValidationPipe.name)

  constructor(private getUserByUsername: GetUserByUsernameUseCase) {}

  async transform({ document }) {
    const result = await this.getUserByUsername.execute({
      username: '',
    })

    if (result.isLeft()) {
      this.logger.error('User not found in token')
      throw new UnauthorizedException()
    }

    return {
      user: result.value.user,
    }
  }
}
