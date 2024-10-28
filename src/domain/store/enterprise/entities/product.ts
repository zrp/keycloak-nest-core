import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Money } from './value-objects/dinero'
import { Slug } from './value-objects/slug'

export interface ProductProps {
  slug: Slug
  name: string
  description: string

  price: Money
}

export class Product extends Entity<ProductProps> {
  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get slug(): Slug {
    return this.props.slug
  }

  get price(): Money {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = Money.create(price)
  }

  static create(props: ProductProps, id?: UniqueEntityID): Product {
    return new Product(props, id)
  }
}
