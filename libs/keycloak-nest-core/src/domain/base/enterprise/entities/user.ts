import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  id: UniqueEntityID
  createdAt: Date
  username: string

  requiredUserActions?: string[] // TODO: create value object

  email?: string // TODO: create value object
  emailVerified?: boolean

  firstName?: string
  lastName?: string

  attributes: Record<string, string>
  roles?: string[] // TODO: create value object
  groups?: string[] // TODO: create value object
}

export class User extends Entity<UserProps> {
  get id() {
    return this.props.id
  }

  get createdAt() {
    return this.props.createdAt
  }

  get username() {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get requiredUserActions() {
    return this.props.requiredUserActions
  }

  addRequiredUserAction(action: string) {
    this.props.requiredUserActions?.push(action)
  }

  get email() {
    return this.props.email
  }

  set email(email: string | undefined) {
    this.props.email = email
  }

  get emailVerified() {
    return this.props.emailVerified
  }

  set emailVerified(verified: boolean | undefined) {
    this.props.emailVerified = verified
  }

  get firstName() {
    return this.props.firstName
  }

  set firstName(name: string | undefined) {
    this.props.firstName = name
  }

  get lastName() {
    return this.props.lastName
  }

  set lastName(name: string | undefined) {
    this.props.lastName = name
  }

  get attributes() {
    return this.props.attributes
  }

  set attributes(attributes: Record<string, string>) {
    this.props.attributes = attributes
  }

  get roles() {
    return this.props.roles
  }

  set roles(roles: string[] | undefined) {
    this.props.roles = roles
  }

  get groups() {
    return this.props.groups
  }

  set groups(groups: string[] | undefined) {
    this.props.groups = groups
  }

  static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id)
  }
}
