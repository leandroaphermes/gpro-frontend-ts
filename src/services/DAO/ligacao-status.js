import api from '../api'

class LigacaoStatusDao {
  static getTodosAtivos() {
    return api.get('/ligacao-status', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/ligacao-status', {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/ligacao-status', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`/ligacao-status/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static criarItem(id, value) {
    return api.post(`/ligacao-status/${id}/item`, value, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizarItem(id, item_id, values) {
    return api.put(`/ligacao-status/${id}/item/${item_id}`, values, {
      validateStatus: (s) => s === 200
    })
  }
}

export default LigacaoStatusDao
