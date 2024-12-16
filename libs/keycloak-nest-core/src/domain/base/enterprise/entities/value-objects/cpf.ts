import { format, isValid as isValidCPF, strip } from '@fnando/cpf'

export class CPF {
  private value: string

  private constructor(value: string) {
    this.value = value
  }

  getDigits(): string {
    return this.value.replace(/\D/g, '')
  }

  toString(): string {
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
    const digits = strip(cpf)
    const formattedCPF = format(digits)

    const isValid = isValidCPF(digits)

    if (!isValid) {
      throw new Error('Invalid CPF')
    }

    return new CPF(formattedCPF)
  }

  equals(value: string): boolean {
    return CPF.isValid(value) && this.value === CPF.create(value).value
  }

  /**
   * Validates CPF with the CPF validator algorithm,
   * also validates if the CPF is formatted correctly
   *
   * Example: 529.982.247-25 => true
   *
   * @param cpf {string}
   */
  static isValid(cpf: string): boolean {
    return isValidCPF(cpf, true)
  }
}
