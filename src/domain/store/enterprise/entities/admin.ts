import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { CPF } from './value-objects/cpf'

export interface AdminProps {
  name: string
  cpf: CPF
  password: string
}

export class Admin extends Entity<AdminProps> {
  get name(): string {
    return this.props.name
  }

  get cpf(): CPF {
    return this.props.cpf
  }

  get password(): string {
    return this.props.password
  }

  static create(props: AdminProps, id?: UniqueEntityID): Admin {
    return new Admin(props, id)
  }
}
