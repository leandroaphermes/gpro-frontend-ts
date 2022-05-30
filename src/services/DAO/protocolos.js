import api from '../api'

class ProtocolosDao {
  static getBuscar(params = {}) {
    return api.get('/protocolos', {
      params: params,
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/protocolos', values, {
      validateStatus: (s) => s === 201
    })
  }

  static responder(id, values) {
    return api.put(`/protocolos/${id}/responder`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static encerrar(id, values) {
    return api.put(`/protocolos/${id}/encerrar`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static converterStatus(value) {
    const result = this.listaStatus().find((item) => item.value === value)
    return result || { text: 'Desconhecido', color: 'default' }
  }

  static listaStatus() {
    return [
      { value: 'A', text: 'Aberto', color: 'error' },
      { value: 'F', text: 'Encerrado', color: 'success' },
      { value: 'R', text: 'Respondido', color: 'processing' }
    ]
  }

  static converterTipo(value) {
    const result = this.listaTipos().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { value: 'informacao', text: 'Informação' },
      { value: 'requisicao', text: 'Solicitação' }
    ]
  }
}

export default ProtocolosDao
