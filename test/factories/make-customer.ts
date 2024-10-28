import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import fakerBr from 'faker-br'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Customer,
  CustomerProps,
} from '@/domain/store/enterprise/entities/customer'
import { CPF } from '@/domain/store/enterprise/entities/value-objects/cpf'
import { PrismaCustomerMapper } from '@/infra/database/prisma/mappers/prisma-customer-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityID,
) {
  const customer = Customer.create(
    {
      name: faker.person.fullName(),
      cpf: CPF.create(fakerBr.br.cpf()),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return customer
}

@Injectable()
export class CustomerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCustomer(
    data: Partial<CustomerProps> = {},
  ): Promise<Customer> {
    const customer = makeCustomer(data)

    await this.prisma.user.create({
      data: PrismaCustomerMapper.toPrisma(customer),
    })

    return customer
  }
}
