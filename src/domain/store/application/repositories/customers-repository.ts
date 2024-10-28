import { Customer } from '../../enterprise/entities/customer'

export abstract class CustomersRepository {
  abstract findByDocument(document: string): Promise<Customer | null>
}
