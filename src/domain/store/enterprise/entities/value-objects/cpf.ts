export class CPF {
  private value: string

  private constructor(value: string) {
    this.value = value
  }

  toString(): string {
    return this.value.replace(/\D/g, '')
  }

  toValue(): string {
    return this.value
  }

  /**
   * Creates a CPF from an unformatted validated CPF text, returns a new CPF instance
   *
   * Example: 52998224725 => 529.982.247-25
   *
   * @param text {string}
   */
  static create(cpf: string) {
    const digits = cpf.trim().replace(/\D/g, '')
    const formattedCPF = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`

    return new CPF(formattedCPF)
  }

  equals(value: string): boolean {
    return CPF.validate(value) && this.value === CPF.create(value).value
  }

  /**
   * Validates CPF with the CPF validator algorithm,
   * also validates if the CPF is formatted correctly
   *
   * Example: 529.982.247-25 => true
   *
   * @param cpf {string}
   */
  static validate(cpf: string): boolean {
    // 097.161.399-00
    const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
    const isFormatted = regex.test(cpf)

    if (!isFormatted) {
      return false
    }

    const digits = cpf.replace(/\D/g, '').split('').map(Number)
    const isSameNumber = digits.every((digit) => digit === digits[0])

    if (isSameNumber) {
      return false
    }

    const [secondDigit, firstDigit, ...firstNineReversed] = digits.reverse()

    const firstSum = firstNineReversed.reduce(
      (acc, digit, index) => acc + digit * (index + 2),
      0,
    )

    const restOfDivision = (firstSum * 10) % 11
    const firstDigitExpected = restOfDivision === 10 ? 0 : restOfDivision

    if (firstDigitExpected !== firstDigit) {
      return false
    }

    const secondSum = [firstDigit, ...firstNineReversed].reduce(
      (acc, digit, index) => acc + digit * (index + 2),
      0,
    )

    const restOfDivisionSecond = (secondSum * 10) % 11
    const secondDigitExpected =
      restOfDivisionSecond === 10 ? 0 : restOfDivisionSecond

    if (secondDigitExpected !== secondDigit) {
      return false
    }

    return true
  }
}
