import { Injectable } from '@nestjs/common'

import { CustomersRepository } from '@/domain/store/application/repositories/customers-repository'
import { Customer } from '@/domain/store/enterprise/entities/customer'
import { CPF } from '@/domain/store/enterprise/entities/value-objects/cpf'

import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async findByDocument(cpf: string): Promise<Customer | null> {
    const customer = await this.prisma.user.findUnique({
      where: {
        role: 'CUSTOMER',
        document: CPF.create(cpf).toString(),
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }
}
