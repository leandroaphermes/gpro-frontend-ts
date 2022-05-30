import api from '../api'

const prefix = '/questionario-modelos'

class QuestionarioModelosDao {
  static getTodosAtivos() {
    return api.get(prefix, {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get(prefix, {
      validateStatus: (s) => s === 200
    })
  }

  static getByID(id) {
    return api.get(`${prefix}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`${prefix}/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }
}

export default QuestionarioModelosDao
