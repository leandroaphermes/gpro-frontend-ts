import { cpf } from 'cpf-cnpj-validator'

export default function ExtendCpf(rule, value) {
  return new Promise((resolve, reject) => {
    if (!value && !rule.required) resolve()
    if (cpf.isValid(value)) resolve()
    reject(new Error('CPF não é valido'))
  })
}
