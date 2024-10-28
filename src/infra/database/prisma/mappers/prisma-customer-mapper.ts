import { Prisma, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customer } from '@/domain/store/enterprise/entities/customer'
import { CPF } from '@/domain/store/enterprise/entities/value-objects/cpf'

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaUser): Customer {
    return Customer.create(
      {
        cpf: CPF.create(raw.document),
        name: raw.name,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(customer: Customer): Prisma.UserUncheckedCreateInput {
    return {
      id: customer.id.toString(),
      document: customer.cpf.toString(),
      name: customer.name,
      password: customer.password,
      role: 'CUSTOMER',
    }
  }
}
