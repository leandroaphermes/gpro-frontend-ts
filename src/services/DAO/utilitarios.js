import api from '../api'

class UtilitariosDao {
  static unificarCadastrosCliente(values) {
    return api.post(`/utilitarios/unificar-cadastro-cliente`, values, {
      validateStatus: (s) => s === 204
    })
  }
}

export default UtilitariosDao
