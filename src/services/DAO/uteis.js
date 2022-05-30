import api from '../api'

class Uteis {
  static getTodosBancos() {
    return api.get('/uteis/lista-bancos', {
      validateStatus: (s) => s === 200
    })
  }
}

export default Uteis
