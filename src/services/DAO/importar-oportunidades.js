import api from '../api'

const prefix = '/importar-oportunidades'

class ImportarOportunidadesDao {
  static getTodos() {
    return api.get(prefix, {
      validateStatus: (s) => s === 200
    })
  }

  static getUrlInvalido(id) {
    return api.get(`${prefix}/${id}/url-invalidos`, {
      validateStatus: (s) => s === 200
    })
  }

  static importar(values) {
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  static excluir(id) {
    return api.delete(`${prefix}/${id}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default ImportarOportunidadesDao
