import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { GetCustomerByCPFUseCase } from './get-user-by-username'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: GetCustomerByCPFUseCase

describe('Get Customer by CPF', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    sut = new GetCustomerByCPFUseCase(inMemoryCustomersRepository)
  })

  it('should be able to get a customer by CPF', async () => {
    const cpf = CPF.create('12345678909')

    const newCustomer = makeCustomer({
      cpf,
    })

    inMemoryCustomersRepository.items.push(newCustomer)

    const result = await sut.execute({
      cpf: cpf.getDigits(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      customer: expect.objectContaining(newCustomer),
    })
  })

  it('should not be able to get a customer by CPF if it does not exist', async () => {
    const cpf = CPF.create('12345678909')

    const result = await sut.execute({
      cpf: cpf.getDigits(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get a customer by CPF if it is invalid', async () => {
    const cpf = CPF.create('12345678900')

    const newCustomer = makeCustomer({
      cpf,
    })

    inMemoryCustomersRepository.items.push(newCustomer)

    const result = await sut.execute({
      cpf: '12345678908',
    })

    expect(result.isLeft()).toBe(true)
  })
})
