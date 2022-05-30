import Mask from '../../utils/mask'
import api from '../api'

const rota = '/numero-ignorados'

class NumeroIgnoradosDao {
  static getTodos() {
    return api.get(rota, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.numero_check) {
      values.numero_check = values.numero_check.map((tel) => {
        return Mask.telefoneOnlyNumber(tel)
      })
    }
    if (values.numero) {
      values.numero = Mask.telefoneOnlyNumber(values.numero)
    }
    return api.post(rota, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizaRenovar(values) {
    values.numero = Mask.telefoneOnlyNumber(values.numero)

    return api.put(`${rota}/${values.numero}/renovar`, {
      validateStatus: (s) => s === 200
    })
  }

  static excluir(values) {
    values.numero = Mask.telefoneOnlyNumber(values.numero)

    return api.delete(`${rota}/${values.numero}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default NumeroIgnoradosDao
