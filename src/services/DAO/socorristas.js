import api from '../api'

class SocorristasDao {
  static getTodosAtivos() {
    return api.get('/socorristas', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/socorristas', {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id > 0) {
      // se ja tem id, atualiza
      return api.put(`/socorristas/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post('/socorristas', values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default SocorristasDao
