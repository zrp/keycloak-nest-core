import Dinero, { Currency, Dinero as DineroType } from 'dinero.js'

export class Money {
  public value: DineroType
  public currency: Currency = 'BRL'

  private constructor(value: DineroType) {
    Dinero.defaultCurrency = this.currency
    this.value = value
  }

  static create(amount: number, currency: Currency = 'BRL') {
    const dinero = Dinero({ amount, currency, precision: 2 })
    const money = new Money(dinero)

    money.currency = currency
    return money
  }

  static setDefaultCurrency(currency: Currency) {
    Dinero.defaultCurrency = currency
  }
}
