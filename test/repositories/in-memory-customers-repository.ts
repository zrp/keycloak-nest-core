import { CustomersRepository } from '@/domain/store/application/repositories/customers-repository'
import { Customer } from '@/domain/store/enterprise/entities/customer'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findByDocument(document: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.cpf.equals(document))

    if (!customer) {
      return null
    }

    return customer
  }
}
