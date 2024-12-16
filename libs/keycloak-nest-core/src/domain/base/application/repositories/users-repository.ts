import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract findByUsername(username: string): Promise<User | null>
}
