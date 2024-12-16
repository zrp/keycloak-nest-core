import { UseCaseError } from '@/core/errors/use-case-error'

export class TokenNotFound extends Error implements UseCaseError {
  constructor() {
    super('No token available')
  }
}
