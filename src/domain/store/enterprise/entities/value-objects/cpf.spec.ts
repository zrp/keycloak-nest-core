import { CPF } from './cpf'

describe('CPF Value-Object', () => {
  it('should be able to validate CPF', () => {
    const cpfText = '529.982.247-25'
    const cpfText2 = '52998224725'

    const isCPFValid = CPF.validate(cpfText)
    const isCPFValid2 = CPF.validate(cpfText2)

    expect(isCPFValid).toBe(true)
    expect(isCPFValid2).toBe(true)
  })

  it('should not be able to validate false CPF', () => {
    const cpfText = '529.982.247-26'

    const isCPFValid = CPF.validate(cpfText)

    expect(isCPFValid).toBe(false)
  })

  it('should not be able to validate same digit CPF', () => {
    const cpfText = '111.111.111-11'

    const isCPFValid = CPF.validate(cpfText)

    expect(isCPFValid).toBe(false)
  })

  it('should be able to create a CPF from text', () => {
    const cpfText = '52998224725'

    const cpf = CPF.create(cpfText)

    expect(cpf).toBeInstanceOf(CPF)
    expect(cpf.toValue()).toBe('529.982.247-25')
  })

  it('should be able to return unformatted CPF from text', () => {
    const cpfText = '52998224725'

    const cpf = CPF.create(cpfText)

    expect(cpf).toBeInstanceOf(CPF)
    expect(cpf.toString()).toBe('52998224725')
  })
})
