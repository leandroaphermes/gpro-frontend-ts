import api from '../api'
import FinanceiroGruposDao from './financeiro-grupos'

class FinanceiroLancamentosDao {
  static async getBuscar(values) {
    return api.get('/financeiro-lancamentos', {
      params: values,
      validateStatus: (s) => s === 200
    })
    .then((response) => {
      return {
        ...response,
        data: response.data.map((row) => ({
          ...row,
          tipo: FinanceiroGruposDao.converterTipo(this.indentificaTipo(row))
        }))
      }
    })
  }

  static getPorId(id) {
    return api.get(`/financeiro-lancamentos/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static async criar({ origem_id: [ , origem_id ], destino_id: [ , destino_id ] ,...values}) {
    values.movimento_data = values.movimento_data.format('YYYY-MM-DD')
    values.referencia_mes = Number(values.referencia_data.format('M'))
    values.referencia_ano = Number(values.referencia_data.format('YYYY'))

    values.origem_id = origem_id
    values.destino_id = destino_id

    return api.post('/financeiro-lancamentos', values, {
      validateStatus: (s) => s === 201
    })
    .then((response) => {
      const dados = {
        ...response,
        data: {
          ...response.data,
          tipo: FinanceiroGruposDao.converterTipo(this.indentificaTipo(response.data))
        }
      }
      return dados
    })
  }

  static deletar(id) {
    return api.delete(`/financeiro-lancamentos/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  /**
   *
   * @param {object} value Objeto de lancamento
   * @returns {string} caixa | entrada | saida
   */
  static indentificaTipo(value) {
    let tipo = 'caixa'
    if (value?.origem?.grupo?.tipo === 'entrada') {
      tipo = 'entrada'
    } else if (value?.origem?.grupo?.tipo === 'caixa' && value?.destino?.grupo?.tipo === 'saida') {
      tipo = 'saida'
    }
    return tipo
  }
}

export default FinanceiroLancamentosDao
