import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { CustomerFactory } from '@root/test/factories/make-customer'
import request from 'supertest'

import { CPF } from '@/domain/store/enterprise/entities/value-objects/cpf'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Current Customer (E2E)', () => {
  let app: INestApplication
  let customerFactory: CustomerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CustomerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    customerFactory = moduleRef.get(CustomerFactory)

    await app.init()
  })

  test('[GET] /customers/me', async () => {
    const cpf = CPF.create('52998224725')

    await customerFactory.makePrismaCustomer({
      cpf,
    })

    const query = {
      param: cpf.toString(),
    }

    const stringifiedQuery = new URLSearchParams(query).toString()

    const response = await request(app.getHttpServer())
      .get(`/customers/me?${stringifiedQuery}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      param: cpf.toString(),
      customer: {
        name: expect.any(String),
        cpf: cpf.toValue(),
      },
    })
  })
})
