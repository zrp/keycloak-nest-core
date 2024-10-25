import { Module } from '@nestjs/common'

import { GetCustomerByCPFUseCase } from '@/domain/store/application/use-cases/get-customer-by-cpf'

import { DatabaseModule } from '../database/database.module'
import { GetCurrentCustomerController } from './controllers/get-current-customer.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [GetCurrentCustomerController],
  providers: [GetCustomerByCPFUseCase],
})
export class HttpModule {}
