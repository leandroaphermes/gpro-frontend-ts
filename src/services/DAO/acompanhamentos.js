import api from '../api'
import ProcessosDao from './processos'


class AcompanhamentosDao {
  static async getBuscar(params = {}) {
    return api.get('/acompanhamentos', {
      params: params,
      validateStatus: (s) => s === 200
    })
      .then((response) => {
      return {
        ...response,
        data: response.data.map((row) => ({
          ...row,
          processo: ProcessosDao.calculaTudo(row.processo)
        }))
      }
    })
  }

  static interagir(id, values) {
    return api.post(`/acompanhamentos/${id}`, values, {
      validateStatus: (s) => s === 201
    })
  }

  /* Progressos */
  static getTodosProgressos(id) {
    return api.get(`/acompanhamentos/${id}/progressos`, {
      validateStatus: (s) => s === 200
    })
  }
}

export default AcompanhamentosDao
