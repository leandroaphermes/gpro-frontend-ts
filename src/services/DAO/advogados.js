import api from '../api'

const rota = '/advogados'

class AdvogadosDao {
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
    if (values.telefones) {
      values.telefones = values.telefones.map((tel) => {
        tel.num = parseInt(`${tel.num}`.replace(/[^0-9]+/g, ''))
        return tel
      })
    }

    if (values.id > 0) {
      // se ja tem id, atualiza
      return api.put(`${rota}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(rota, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default AdvogadosDao
