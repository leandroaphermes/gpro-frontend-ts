import api from '../api'

const prefix = '/perca-motivos'

class PerdaMotivosDao {
  static getTodos(filtros) {
    return api.get(prefix, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default PerdaMotivosDao
