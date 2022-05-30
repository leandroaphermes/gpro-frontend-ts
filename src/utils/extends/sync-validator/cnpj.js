import { cnpj } from 'cpf-cnpj-validator'

export default function ExtendCPNJ(rule, value) {
  return new Promise((resolve, reject) => {
    if (!value && !rule.required) resolve()
    if (cnpj.isValid(value)) resolve()
    reject(new Error('CNPJ não é valido'))
  })
}
