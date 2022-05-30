import moment from 'moment'
import UteisCalculoOportunidadePontos from '../../utils/calculoOportunidadePontos'

import api from '../api'

const prefixRouter = '/oportunidades'

class OportunidadesDao {
  static async getTodos(filtros, percentualCobrado, cancelRequest) {
    return api
      .get(prefixRouter, {
        params: filtros,
        validateStatus: (s) => s === 200,
        signal: cancelRequest?.signal
      })
      .then((response) => ({
        ...response,
        data: response.data.map((rowData) => this.calculaTudo(rowData, percentualCobrado))
      }))
  }

  static async getTodosKanban(filtros, percentualCobrado, cancelRequest) {
    return api
      .get(`${prefixRouter}/kanban`, {
        params: filtros,
        validateStatus: (s) => s === 200,
        signal: cancelRequest?.signal
      })
      .then((response) => ({
        ...response,
        data: response.data.map((rowData) => this.calculaTudo(rowData, percentualCobrado))
      }))
  }

  static async getPorID(id) {
    return api
      .get(`${prefixRouter}/${id}`, {
        validateStatus: (s) => s === 200
      })
      .then((response) => ({
        ...response,
        data: this.calculaTudo(response.data)
      }))
  }

  static async salvar(values) {
    if (values?.cliente?.nome) {
      values.cliente.nascimento_data = values?.cliente?.nascimento_data
        ? values.cliente.nascimento_data?.format('YYYY-MM-DD')
        : null
      values.cliente.cpf = values?.cliente?.cpf
        ? String(values.cliente.cpf).replace(/[^0-9]/g, '')
        : null
      values.cliente.telefones =
        values?.cliente?.telefones?.length > 0
          ? values?.cliente?.telefones?.map((tel) => {
              tel.num = parseInt(String(tel.num).replace(/[^0-9]+/g, ''))
              return tel
            })
          : []
    }

    if (values?.oportunidade?.prox_interacao_data) {
      values.oportunidade.prox_interacao_data =
        values.oportunidade.prox_interacao_data?.format('YYYY-MM-DD HH:mm:ss')
    }

    if (values.prox_interacao_data) {
      values.prox_interacao_data = values.prox_interacao_data?.format('YYYY-MM-DD HH:mm:ss')
    }

    if (values.id) {
      return api.put(`${prefixRouter}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api
      .post(prefixRouter, values, {
        validateStatus: (s) => s === 201
      })
      .then((response) => ({
        ...response,
        data: this.calculaTudo(response.data)
      }))
  }

  static excluir(id, excluirCliente) {
    return api.delete(`${prefixRouter}/${id}`, {
      params: { excluir_cliente: excluirCliente },
      validateStatus: (s) => s === 204
    })
  }

  static atualizarMoverEtapa(id, nova_etapa_id) {
    return api.put(`${prefixRouter}/${id}/mover-etapa/${nova_etapa_id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarPerderOportunidade(id, values) {
    return api.put(`${prefixRouter}/${id}/perder-oportunidade`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarRetornarPendente(id) {
    return api.put(`${prefixRouter}/${id}/retornar-pendente`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarEfetivar(id) {
    return api.put(`${prefixRouter}/${id}/efetivar`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarIniciarProcessos(id, values) {
    return api.put(`${prefixRouter}/${id}/iniciar-processos`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarDesarquivar(id) {
    return api.put(`${prefixRouter}/${id}/desarquivar`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarMarcadores(id, values) {
    return api.put(`${prefixRouter}/${id}/marcadores`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarMoverFunil(id, values) {
    return api.put(`${prefixRouter}/${id}/mover-funil`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static calculaTudo(oportunidade, percentualCobrado) {
    const diasCorridos = moment().diff(oportunidade.ultima_etapa.created_at, 'days')
    const isDiasCorridos = moment().isAfter(oportunidade.ultima_etapa.created_at, 'days')

    const proxInteracaoData = moment(oportunidade.prox_interacao_data)
    const isInteracaoAtrasada = moment().isAfter(proxInteracaoData, 'days')
    const interacaoDiasCorridos = moment().diff(proxInteracaoData, 'days')
    return {
      ...oportunidade,
      dias_corridos: !isDiasCorridos && diasCorridos === 0 ? 0 : diasCorridos || 1,
      prox_interacao_dias_corridos:
        !isInteracaoAtrasada && interacaoDiasCorridos === 0 ? 0 : interacaoDiasCorridos || 1,
      ...(percentualCobrado
        ? {
            servicos_apurados_prioridade: UteisCalculoOportunidadePontos.calcularPontosServicoTotal(
              oportunidade.servico_apurados.filter(
                (rowOSA) => rowOSA.__meta__.requisito_pendente_count === 0
              ),
              percentualCobrado,
              oportunidade?.potencial_lesao_apuradas?.total_potencial || 0
            ),
            servicos_potencial_prioridade:
              UteisCalculoOportunidadePontos.calcularPontosServicoTotal(
                oportunidade.servico_apurados,
                percentualCobrado,
                oportunidade?.potencial_lesao_apuradas?.total_potencial || 0
              )
          }
        : {})
    }
  }

  static getTodosHistoricos(id) {
    return api.get(`${prefixRouter}/${id}/historicos`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarHistoricos(id, values) {
    return api.post(`${prefixRouter}/${id}/historicos`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static converterTipoHistorico(value) {
    const result = this.listaTipoHistorico().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaTipoHistorico() {
    return [
      { value: 'nota', text: 'Notas' },
      { value: 'ligacao', text: 'Ligações' },
      { value: 'etapa', text: 'Etapas' },
      { value: 'apuracao', text: 'Serviços/Lesões (Apuração)' }
    ]
  }

  static converterStatus(value) {
    const result = this.listaStatus().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaStatus() {
    return [
      { value: 'pendente', text: 'Pendente' },
      { value: 'efetivada', text: 'Efetivada' },
      { value: 'perdida', text: 'Perdida' }
    ]
  }

  /* Lessões Apurados */
  static getTodosLesaoApuradas(id) {
    return api.get(`${prefixRouter}/${id}/lesao-apuradas`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvarLesaoApurada(id, values) {
    if (values.id) {
      return api.put(`${prefixRouter}/${id}/lesao-apuradas/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefixRouter}/${id}/lesao-apuradas`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static deletarLesaoApurada(id, lesao_id) {
    return api.delete(`${prefixRouter}/${id}/lesao-apuradas/${lesao_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  /* Servicos Apurados */
  static getTodosServicosApurados(oportunidade_id) {
    return api.get(`${prefixRouter}/${oportunidade_id}/servicos-apurados`, {
      validateStatus: (s) => s === 200
    })
  }

  static getByIdServicosApurados(oportunidade_id, apuracao_id) {
    return api.get(`${prefixRouter}/${oportunidade_id}/servicos-apurados/${apuracao_id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvarServicosApurados(oportunidade_id, values) {
    if (values.valor_cobertura === null) values.valor_cobertura = 0

    if (values?.id) {
      return api.put(`${prefixRouter}/${oportunidade_id}/servicos-apurados/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefixRouter}/${oportunidade_id}/servicos-apurados`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static deletarServicosApurados(oportunidade_id, servico_id) {
    return api.delete(`${prefixRouter}/${oportunidade_id}/servicos-apurados/${servico_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static atualizarServicosApuradosStatusApurado(oportunidade_id, servico_id, values) {
    return api.put(
      `${prefixRouter}/${oportunidade_id}/servicos-apurados/${servico_id}/status-apurado`,
      values,
      {
        validateStatus: (s) => s === 200
      }
    )
  }

  /* Requisitos */
  static getTodosServicosRequisitos(id) {
    return api.get(`${prefixRouter}/${id}/servico-requisitos`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarServicoRequisitos(id, values) {
    return api.put(`${prefixRouter}/${id}/servico-requisitos`, values, {
      validateStatus: (s) => s === 200
    })
  }

  /* Anexos */
  static getTodosAnexos(id) {
    return api.get(`${prefixRouter}/${id}/anexos`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarAnexos(id, form, options) {
    return api.post(`${prefixRouter}/${id}/anexos`, form, options)
  }

  static deletarAnexos(id) {
    return api.delete(`${prefixRouter}/${id}/anexos`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default OportunidadesDao
