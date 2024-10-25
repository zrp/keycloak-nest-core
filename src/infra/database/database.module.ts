import { Module } from '@nestjs/common'

import { CustomersRepository } from '@/domain/store/application/repositories/customers-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaCustomersRepository } from './prisma/repositories/prisma-customers-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomersRepository,
      useClass: PrismaCustomersRepository,
    },
  ],
  exports: [PrismaService, CustomersRepository],
})
export class DatabaseModule {}
