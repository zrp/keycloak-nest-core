import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Customer } from '../../enterprise/entities/customer'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { CustomersRepository } from '../repositories/customers-repository'
import { InvalidCPFError } from './errors/invalid-cpf-error'

interface GetCustomerByCPFUseCaseRequest {
  cpf: string
}

type GetCustomerByCPFUseCaseResponse = Either<
  InvalidCPFError | ResourceNotFoundError,
  { customer: Customer }
>

@Injectable()
export class GetCustomerByCPFUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    cpf,
  }: GetCustomerByCPFUseCaseRequest): Promise<GetCustomerByCPFUseCaseResponse> {
    const cpfValue = CPF.create(cpf)

    if (!CPF.validate(cpfValue.toValue())) {
      return left(new InvalidCPFError())
    }

    const customer = await this.customersRepository.findByDocument(cpf)

    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    return right({ customer })
  }
}
