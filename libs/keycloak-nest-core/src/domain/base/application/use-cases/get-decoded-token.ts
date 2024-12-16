import { Injectable } from '@nestjs/common'
import { TokenNotFound } from '@root/libs/keycloak-nest-core/src/domain/base/application/use-cases/errors/token-not-found'

import { Either, left } from '@/core/either'

import { UsersRepository } from '../repositories/users-repository'

interface GetUserByUsernameUseCaseRequest {
  request: {
    headers: {
      authorization: {
        token?: string
      }
    }
  }
}

type GetUserByUsernameUseCaseResponse = Either<
  TokenNotFound,
  { decodedToken: Record<string, unknown> }
>

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    request,
  }: GetUserByUsernameUseCaseRequest): Promise<GetUserByUsernameUseCaseResponse> {
    const { token } = request.headers.authorization
    const [, accessToken] = token?.split('Bearer ') || []

    if (!token || !accessToken) {
      return left(new TokenNotFound())
    }

    const { header } = jwt.decode(accessToken, { complete: true })
    const kid = header.kid

    const jwksClient = JwksClient({
      jwksUri: `${process.env.AUTH_ISSUER_URI}/protocol/openid-connect/certs`,
    })

    const signKey = await jwksClient.getSigningKey(kid)
    const publicKey = signKey.getPublicKey()

    // const decodedToken = jwt.verify(accessToken, publicKey) as jwt.JwtPayload &
    //   DecodedToken
  }
}
