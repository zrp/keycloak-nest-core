import { Customer } from '@/domain/store/enterprise/entities/customer'

export class CustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      name: customer.name,
      cpf: customer.cpf.toValue(),
    }
  }
}
