import api from '../api'

class CaptadorTiposDao {
  static getTodosAtivos() {
    return api.get('/captador-tipos', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/captador-tipos', {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/captador-tipos', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`/captador-tipos/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static getTodosItensCaptador() {
    return api.get('/captador-tipos/captadores', {
      validateStatus: (s) => s === 200
    })
  }

  static criarItem(id, value) {
    return api.post(`/captador-tipos/${id}/item`, value, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizarItem(id, item_id, values) {
    return api.put(`/captador-tipos/${id}/item/${item_id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static converterTipo(type) {
    const result = this.listaTipos().find((item) => item.value === type)
    return result || { text: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { value: 'texto', text: 'Texto' },
      { value: 'lista', text: 'Lista' },
      { value: 'captadores', text: 'Lista Especial' }
    ]
  }
}

export default CaptadorTiposDao
