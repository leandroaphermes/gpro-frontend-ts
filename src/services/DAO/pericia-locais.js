import api from '../api'

class PericiaLocaisDao {
  static getTodosAtivos() {
    return api.get('/pericia-locais', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/pericia-locais', {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    values.telefone = parseInt(`${values.telefone}`.replace(/[^0-9]+/g, ''))
    return api.post('/pericia-locais', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    values.telefone = parseInt(`${values.telefone}`.replace(/[^0-9]+/g, ''))
    return api.put(`/pericia-locais/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }
}

export default PericiaLocaisDao
