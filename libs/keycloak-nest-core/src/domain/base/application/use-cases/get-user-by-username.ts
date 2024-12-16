import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface GetUserByUsernameUseCaseRequest {
  username: string
}

type GetUserByUsernameUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: User }
>

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
  }: GetUserByUsernameUseCaseRequest): Promise<GetUserByUsernameUseCaseResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
