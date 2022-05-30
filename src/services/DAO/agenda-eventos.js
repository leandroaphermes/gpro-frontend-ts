import moment from 'moment'

import api from '../api'

const rota = '/agenda-eventos'

class AgendaEventosDao {
  static getTodos(params) {
    return api.get(rota, {
      params: params,
      validateStatus: (s) => s === 200
    })
  }

  static getPorID(id) {
    return api.get(`${rota}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values?.inicio_data && moment.isMoment(values.inicio_data))
      values.inicio_data = values.inicio_data.format('YYYY-MM-DD HH:mm')
    if (values?.final_data && moment.isMoment(values.final_data))
      values.final_data = values.final_data.format('YYYY-MM-DD HH:mm')

    if (values.id > 0) {
      return api.put(`${rota}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(rota, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizarStatus(id, status) {
    return api.put(`${rota}/${id}/atualizar-status`, status, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarArquivar(id) {
    return api.put(`${rota}/${id}/arquivar`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarDesarquivar(id) {
    return api.put(`${rota}/${id}/desarquivar`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarObservado(id, values) {
    return api.put(`${rota}/${id}/observado`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static converterStatus(value) {
    const result = this.listaStatus().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaStatus() {
    return [
      { value: 'pendente', text: 'Pendente', color: 'processing' },
      { value: 'realizada', text: 'Realizado', color: 'success' },
      { value: 'cancelado', text: 'Cancelado', color: 'default' }
    ]
  }
}

export default AgendaEventosDao
