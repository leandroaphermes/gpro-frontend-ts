import api from '../api'

class SeguradorasDao {
  static getTodosAtivos() {
    return api.get('/seguradoras', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/seguradoras', {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values?.id) {
      return api.put(`/seguradoras/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post('/seguradoras', values, {
      validateStatus: (s) => s === 201
    })
  }

  static getTodosHistoricos(id) {
    return api.get(`/seguradoras/${id}/historicos`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarHistoricos(id, values) {
    return api.post(`/seguradoras/${id}/historicos`, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default SeguradorasDao
