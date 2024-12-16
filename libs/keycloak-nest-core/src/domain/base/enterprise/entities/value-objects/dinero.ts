import DineroJS, { Currency } from 'dinero.js'

export class Money {
  public money: DineroJS.Dinero

  private constructor(value: DineroJS.Dinero) {
    this.money = value
  }

  static create(
    value: number | string,
    currency: Currency = 'BRL',
    language = 'pt-BR',
  ) {
    return new Money(
      DineroJS({
        amount: this.getNumber(value),
        currency,
      }).setLocale(language),
    )
  }

  private static getNumber(value: string | number): number {
    const valueString = String(value)

    const isNotNumber = isNaN(Number(valueString))
    const isNotDecimal = !valueString.includes('.')

    if (isNotNumber || isNotDecimal) {
      return Number(valueString.replace(/\D/g, ''))
    }

    const [reals, cents = '0'] = valueString.split('.')
    return Number(reals) * 100 + Number(cents)
  }

  format() {
    return this.money.toFormat('$0,0.00')
  }

  amount() {
    return this.money.getAmount()
  }

  equals(value: DineroJS.Dinero) {
    return this.money === value
  }
}
