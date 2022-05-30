import api from '../api'

class DepartamentosDao {
  static getTodosAtivos() {
    return api.get('/departamentos', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/departamentos', {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id > 0) {
      // se ja tem id, atualiza
      return api.put(`/departamentos/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post('/departamentos', values, {
      validateStatus: (s) => s === 201
    })
  }

  static criar(values) {
    return api.post('/departamentos', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`/departamentos/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }
}

export default DepartamentosDao
