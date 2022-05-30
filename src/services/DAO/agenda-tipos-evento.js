import api from '../api'

const rota = '/agenda-evento-tipos'

class AgendaTiposEventosDao {
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

  static converterAcoes(value) {
    const result = this.listaAcoes().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaAcoes() {
    return [{ value: 'pedir_autorizacao', text: 'Pedir Autorização' }]
  }
}

export default AgendaTiposEventosDao
