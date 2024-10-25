import { randomUUID } from 'crypto'

export class UniqueEntityID {
  private value: string

  toString(): string {
    return this.value
  }

  toValue(): string {
    return this.value
  }

  isNumber(): boolean {
    return !isNaN(Number(this.value))
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueEntityID | string): boolean {
    return id.toString() === this.value
  }
}
