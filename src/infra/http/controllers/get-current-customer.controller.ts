import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { GetCustomerByCPFUseCase } from '@/domain/store/application/use-cases/get-customer-by-cpf'

import { CustomerPresenter } from '../presenters/customer-presenter'

const GetCurrentCustomerQuerySchema = z.object({
  param: z.string(),
})

type GetCurrentCustomerQuery = z.infer<typeof GetCurrentCustomerQuerySchema>

@Controller('/customers/me')
export class GetCurrentCustomerController {
  constructor(private getCustomerByCPFUseCase: GetCustomerByCPFUseCase) {}

  @Get()
  async handle(@Query() query: GetCurrentCustomerQuery) {
    const { param } = GetCurrentCustomerQuerySchema.parse(query)

    const result = await this.getCustomerByCPFUseCase.execute({
      cpf: param,
    })

    console.log(result)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      param: query.param,
      customer: CustomerPresenter.toHTTP(result.value.customer),
    }
  }
}
