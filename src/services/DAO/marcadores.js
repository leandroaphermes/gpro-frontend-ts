import api from '../api'

const rota = '/marcadores'

class MarcadoresDao {
  static getTodosAtivos() {
    return api.get(rota, {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get(rota, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id > 0) {
      return api.put(`${rota}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(rota, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default MarcadoresDao
