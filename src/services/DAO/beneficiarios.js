import api from '../api'

const prefix = '/beneficiarios'

class BeneficiariosDao {
  static async getBuscar(params = {}) {
    return api.get(prefix, {
      params: params,
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    values.nascimento_data = values.nascimento_data
      ? values.nascimento_data.format('YYYY-MM-DD')
      : null
    values.telefone = values.telefone
      ? parseInt(`${values.telefone}`.replace(/[^0-9]+/g, '')) || null
      : null
    values.cpf = values.cpf ? parseInt(`${values.cpf}`.replace(/[^0-9]+/g, '')) || null : null

    if (values?.id) {
      return api.put(`${prefix}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}`, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default BeneficiariosDao
