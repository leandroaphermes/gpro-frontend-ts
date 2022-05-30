/* eslint-disable no-template-curly-in-string */
const typeTemplate = 'Não é valido. Esperando algo do tipo ${type}'

const defaultValidateMessages = {
  default: 'Erro de validação no campo ${label}',
  required: 'Este campo é obrigatório',
  enum: "'Deve ser algum valor destas opções [${enum}]",
  whitespace: 'Ops. Não pode ser vazio',
  date: {
    format: 'Não aceito este tipo de data',
    parse: 'Não consegui entender como data',
    invalid: 'Esta data é invalida'
  },
  types: {
    string: 'Não é valido. Esperando algo do tipo texto',
    method: typeTemplate,
    array: 'Não é valido. Esperando algo do tipo lista',
    object: 'Não é valido. Esperando algo do tipo objeto',
    number: 'Não é valido. Esperando algo do tipo numero',
    date: 'Não é valido. Esperando algo do tipo data',
    boolean: 'Não é valido. Esperando algo do tipo boleano',
    integer: 'Não é valido. Esperando algo do tipo numero inteiro',
    float: 'Não é valido. Esperando algo do tipo numero flutuante ou inteiro',
    regexp: typeTemplate,
    email: 'Não é um email valido',
    url: 'Não é valido. Esperando algo do tipo URL',
    hex: typeTemplate
  },
  string: {
    len: 'Este campo deve conter ${len} caracteres',
    min: 'Deve conter no minimo ${min} caracteres',
    max: 'Deve conter no máximo ${max} caracteres',
    range: 'Deve ser entre ${min} e ${max} caracteres'
  },
  number: {
    len: 'Deve ser igual a ${len}',
    min: 'Não pode ser menor que ${min}',
    max: 'Não pode ser maior que ${max}',
    range: 'Deve ser entre ${min} e ${max}'
  },
  array: {
    len: 'Deve ser igual a ${len} de tamanho',
    min: 'Não pode ser menor que ${min} de tamanho',
    max: 'Não pode ser maior que ${max} de tamanho',
    range: 'Deve ser entre ${min} e ${max} de tamanho'
  },
  pattern: {
    mismatch: 'Deve ser padrão de ${pattern}'
  }
}

export default defaultValidateMessages
