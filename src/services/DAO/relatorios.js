import moment from 'moment'
import api from '../api'
import ProcessosDao from './processos'

function converterInstanciaParaFormat(values, format = 'YYYY-MM-DD') {
  Object.keys(values).forEach((key_categoria) => {
    Object.keys(values[key_categoria]).forEach((key_filtros) => {
      if (
        Array.isArray(values[key_categoria][key_filtros]) &&
        values[key_categoria][key_filtros].length === 2 &&
        moment.isMoment(values[key_categoria][key_filtros][0]) &&
        moment.isMoment(values[key_categoria][key_filtros][1])
      ) {
        values[key_categoria][key_filtros] = [
          values[key_categoria][key_filtros][0].format(format),
          values[key_categoria][key_filtros][1].format(format)
        ]
      }
    })
  })
  return values
}

const prefix = '/relatorios'

class RelatoriosDao {
  static getGeralLigacoes(values) {
    return api.post(`${prefix}/geral/ligacoes`, converterInstanciaParaFormat(values), {
      validateStatus: (s) => s === 200
    })
  }

  static async getGeralProcessos(values) {
    return api
      .post(`${prefix}/geral/processos`, converterInstanciaParaFormat(values), {
        validateStatus: (s) => s === 200
      })
      .then((response) => {
        return {
          ...response,
          data: response.data.map((row) => ProcessosDao.calculaTudo(row))
        }
      })
  }

  static getGeralClientes(values) {
    return api.post(`${prefix}/geral/clientes`, converterInstanciaParaFormat(values), {
      validateStatus: (s) => s === 200
    })
  }

  static async getProcessosRecebidos(values) {
    return api
      .get(`${prefix}/processos-recebidos`, {
        params: values,
        validateStatus: (s) => s === 200
      })
      .then((response) => {
        return {
          ...response,
          data: response.data.map((row) => this.calculaTudoProcesso(row))
        }
      })
  }

  static async getProcessosEstagios(values) {
    return api
      .get(`${prefix}/processos-estagios`, {
        params: values,
        validateStatus: (s) => s === 200
      })
      .then((response) => {
        return {
          ...response,
          data: response.data.map((row) => this.calculaTudoProcesso(row))
        }
      })
  }

  static async getOportunidades(values) {
    return api.get(`${prefix}/oportunidades`, {
      params: values,
      validateStatus: (s) => s === 200
    })
  }

  static async getTiposProcessoTotalProcessosCadastrados(values) {
    values.ranger_at = [
      values.ranger_at?.[0]?.format('YYYY-MM-DD'),
      values.ranger_at?.[1]?.format('YYYY-MM-DD')
    ]
    return api.get(`${prefix}/tipos-processo-total-processos-cadastrados`, {
      params: values,
      validateStatus: (s) => s === 200
    })
  }

  static async getClientesCadastrados(values) {
    values.ranger_at = [
      values.ranger_at?.[0]?.format('YYYY-MM-DD'),
      values.ranger_at?.[1]?.format('YYYY-MM-DD')
    ]
    return api.get(`${prefix}/clientes-cadastrados`, {
      params: values,
      validateStatus: (s) => s === 200
    })
  }

  static async getHistogramaTiposProcessoCadastrados(values) {
    values.ranger_at = [
      values.ranger_at?.[0]?.format('YYYY-MM-DD'),
      values.ranger_at?.[1]?.format('YYYY-MM-DD')
    ]
    return api.get(`${prefix}/histograma-tipos-processos-cadastrados`, {
      params: values,
      validateStatus: (s) => s === 200
    })
  }

  static async getHistogramaOportunidades(values) {
    values.ranger_at = [
      values.ranger_at?.[0]?.format('YYYY-MM-DD'),
      values.ranger_at?.[1]?.format('YYYY-MM-DD')
    ]
    return api.get(`${prefix}/histograma-oportunidades`, {
      params: values,
      validateStatus: (s) => s === 200
    })
  }

  static calculaTudoProcesso(processo) {
    return {
      ...processo,
      valores_financeiro: this.calculaValoresFinanceiroProcesso(processo),
      controle_eficiencia: ProcessosDao.calculaControleEficienciaCalculoInvalidez(processo)
    }
  }

  /**
   *
   * @param {object} processo
   * @returns {object} objecto de "valores_financeiro" calculado
   */
  static calculaValoresFinanceiroProcesso(processo) {
    const valor_indenizacao_total = processo.previsao_pagamento_concluidas.reduce(
      (ac, cv) => ac + cv.valor_indenizacao,
      0
    )
    const valor_comissao_total = processo.previsao_pagamento_concluidas.reduce(
      (ac, cv) => ac + cv.valor_comissao,
      0
    )
    const valor_outros_valores_total = processo.previsao_pagamento_concluidas.reduce(
      (ac, cv) => ac + cv.valor_outros_valores,
      0
    )
    const valor_lancamento_total = processo.financas_recebidas.reduce(
      (ac, cv) => ac + cv.lancamento.valor,
      0
    )
    const comissao_liquida_recebida_total = valor_lancamento_total - valor_outros_valores_total

    return {
      valor_indenizacao_total,
      valor_comissao_total,
      valor_outros_valores_total,
      valor_lancamento_total,
      comissao_liquida_recebida_total
    }
  }
}

export default RelatoriosDao
