import api from '../api'

const prefix = '/campos-personalizado-clientes'

class CamposPersonalizadoClientesDao {
  static getTodos(filtros) {
    return api.get(prefix, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.campo_personalizado_id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }

  static async excluir(campo_personalizado_id) {
    return api.delete(`${prefix}/${campo_personalizado_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static async salvarReorganizar(values) {
    return api.put(`${prefix}/reorganizar`, values, {
      validateStatus: (s) => s === 200
    })
  }
}

export default CamposPersonalizadoClientesDao
