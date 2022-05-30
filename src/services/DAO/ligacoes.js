import moment from 'moment'
import api from '../api'

class LigacoesDao {
  static getBuscar(values) {
    return api
      .get(`/ligacoes`, {
        params: values,
        validateStatus: (s) => s === 200
      })
      .then((response) => {
        if (response?.config?.params?.opcao_data === 'ligacao_atrasada') {
          return {
            ...response,
            data: response.data.map((row) => {
              row.dias_atrasados = moment().diff(moment(row.agendado_data), 'day')
              return row
            })
          }
        }
        return response
      })
  }

  static criar(values) {
    values.agendado_data = values.agendado_data.format('YYYY-MM-DD')
    if (
      values?.status_item_id &&
      Array.isArray(values.status_item_id) &&
      values.status_item_id[1]
    ) {
      const [, status_item_id] = values.status_item_id
      values.status_item_id = status_item_id
    }
    return api.post('/ligacoes', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    values.agendado_data = values.agendado_data.format('YYYY-MM-DD')
    return api.put(`/ligacoes/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarConcluir(id, values) {
    return api.put(`/ligacoes/${id}/concluir`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static converterPrioridade(value) {
    const result = this.listaPrioridades().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaPrioridades() {
    return [
      { value: 'normal', text: 'Normal', color: '#1BC7DB' },
      { value: 'alta', text: 'Alta', color: '#AE640C' },
      { value: 'altissima', text: 'Altíssima', color: '#C12B05' }
    ]
  }
}

export default LigacoesDao
