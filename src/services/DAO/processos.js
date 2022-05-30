import moment from 'moment'
import UteisCalculoInvalidez from '../../utils/calculoInvalidez'
import api from '../api'

class ProcessosDao {
  static getBuscar(values, cancelRequest) {
    return api.get(`/processos`, {
      params: values,
      validateStatus: (s) => s === 200,
      signal: cancelRequest.signal
    })
  }

  static getProcessosRecentes() {
    return api.get('/processos/recentes', {
      validateStatus: (s) => s === 200
    })
  }

  static getProcessosAlertaAtivo() {
    return api.get('/processos/alerta-ativo', {
      validateStatus: (s) => s === 200
    })
  }

  static async getPorId(id) {
    return api
      .get(`/processos/${id}`, {
        validateStatus: (s) => s === 200
      })
      .then((response) => {
        return {
          ...response,
          data: this.calculaTudo(response.data)
        }
      })
  }

  static criar(values) {
    return api.post('/processos', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`/processos/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static deletar(id) {
    return api.delete(`/processos/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  /* Ações Especificas */

  static async atualizarEstagio(id, values) {
    if (values?.extras_dados?.previsao_pagamento?.liberacao_data) {
      values.extras_dados.previsao_pagamento.liberacao_data =
        values.extras_dados.previsao_pagamento.liberacao_data.format('YYYY-MM-DD')
    }

    if (values?.extras_dados?.pericia_marcada?.marcada_data) {
      values.extras_dados.pericia_marcada.marcada_data =
        values.extras_dados.pericia_marcada.marcada_data.format('YYYY-MM-DD HH:mm')
    }

    if (values.estagio_data) {
      values.estagio_data = values.estagio_data.format('YYYY-MM-DD')
    }

    return api
      .put(`/processos/${id}/novo-estagio`, values, {
        validateStatus: (s) => s === 200
      })
      .then((response) => {
        return {
          ...response,
          data: this.calculaTudo(response.data)
        }
      })
  }

  static removerAlerta(id) {
    return api.delete(`/processos/${id}/alerta`, {
      validateStatus: (s) => s === 204
    })
  }

  static finalizar(id) {
    return api.put(`/processos/${id}/finalizar`, {
      validateStatus: (s) => s === 200
    })
  }

  static reativar(id) {
    return api.put(`/processos/${id}/reativar`, {
      validateStatus: (s) => s === 200
    })
  }

  static alterarTipoProcesso(id, values) {
    return api.put(`/processos/${id}/alterar-tipo`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarMarcadores(id, values) {
    return api.put(`/processos/${id}/marcadores`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static listaPrazos() {
    return [
      {
        value: 'Alerta',
        text: 'Alerta',
        cor_hex: 'red',
        descricao: 'Processo está muito tempo no estágio'
      },
      {
        value: 'Atenção',
        text: 'Atenção',
        cor_hex: 'orange',
        descricao: 'Processo precisa de atenção, Pois ele está um tempo no estágio'
      },
      {
        value: 'Normal',
        text: 'Normal',
        cor_hex: 'green',
        descricao: 'Processo com o tempo normal de estágio'
      }
    ]
  }

  static calcularPrazo(data, diasCorridos) {
    let alerta = 'Normal'
    const date_number = diasCorridos ?? moment().diff(data.estagio_data.estagio_data, 'day')
    if (
      data.processo_tipo_estagio.prazo_maximo !== null &&
      date_number > data.processo_tipo_estagio.prazo_maximo
    ) {
      alerta = 'Alerta'
    } else if (
      data.processo_tipo_estagio.prazo_medio !== null &&
      data.processo_tipo_estagio.prazo_maximo !== null &&
      date_number >= data.processo_tipo_estagio.prazo_medio &&
      date_number <= data.processo_tipo_estagio.prazo_maximo
    ) {
      alerta = 'Atenção'
    }
    return this.listaPrazos().find((row) => row.value === alerta)
  }

  /**
   * Calcula o prazo_data e dias_corridos e retorna um novo objeto
   * @param {object} processo Objeto do processo com os valores de estagio_data
   * @returns {object}
   */
  static calculaTudo(processo) {
    const estagio_data = processo?.estagio_data?.estagio_data ?? processo?.estagio_data
    const diasCorridos = moment().diff(moment(estagio_data), 'days')
    return {
      ...processo,
      prazo_data: estagio_data ? this.calcularPrazo(processo, diasCorridos) : null,
      dias_corridos: diasCorridos
    }
  }

  /* Relationships */

  /* Arquivos de Documentos */
  static getTodosDocumentos(processo_id) {
    return api.get(`/processos/${processo_id}/documentos`, {
      validateStatus: (s) => s === 200
    })
  }

  static getDocumentos(processo_id, id) {
    return api.get(`/files/processos/${processo_id}/documentos/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static setDocumentos(processo_id, documento_tipo_id, form, options) {
    return api.post(
      `/files/processos/${processo_id}/documentos?documento_tipo_id=${documento_tipo_id}`,
      form,
      {
        ...options,
        validateStatus: (s) => s === 201
      }
    )
  }

  static delDocumentos(processo_id, id) {
    return api.delete(`/files/processos/${processo_id}/documentos/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static downloadDocumentosZip(processo_id, values) {
    return api.post(`/files/documentos/${processo_id}/download`, values, {
      validateStatus: (s) => s === 200,
      responseType: 'arraybuffer'
    })
  }

  /* Historico */
  static getTodosHistoricos(processo_id) {
    return api.get(`/processos/${processo_id}/historicos`, {
      validateStatus: (s) => s === 200
    })
  }

  /* Historico */
  static criarHistorico(processo_id, values) {
    return api.post(`/processos/${processo_id}/historicos`, values, {
      validateStatus: (s) => s === 201
    })
  }

  /* Previsão Pagamento */
  static getTodasPrevisaoPagamentos(processo_id, filtros) {
    return api.get(`/processos/${processo_id}/previsao-pagamentos`, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static confirmarPrevisaoRecebimento(processo_id, previsao_pagamento_id) {
    return api.post(
      `/processos/${processo_id}/previsao-pagamentos/${previsao_pagamento_id}/confirmar`,
      {
        validateStatus: (s) => s === 200
      }
    )
  }

  static deletarPrevisaoPagamento(processo_id, previsao_pagamento_id) {
    return api.delete(`/processos/${processo_id}/previsao-pagamentos/${previsao_pagamento_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  /* Financas */
  static getTodasFinancas(processo_id, filtros) {
    return api.get(`/processos/${processo_id}/financas`, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static criarFinanca(processo_id, values) {
    values.lancamento.movimento_data = values.lancamento.movimento_data.format('YYYY-MM-DD')
    values.lancamento.referencia_mes = Number(values.lancamento.referencia_data.format('M'))
    values.lancamento.referencia_ano = Number(values.lancamento.referencia_data.format('YYYY'))
    const {
      origem_id: [, origem_id],
      destino_id: [, destino_id]
    } = values.lancamento
    values.lancamento.origem_id = origem_id
    values.lancamento.destino_id = destino_id

    values.evento_data = values.evento_data.format('YYYY-MM-DD')

    return api.post(`/processos/${processo_id}/financas`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static converterFinancasTipos(type) {
    const result = this.listaFinancasTipos().find((item) => item.value === type)
    return result || { text: 'Desconhecido', plural: 'Desconhecido' }
  }

  static listaFinancasTipos() {
    return [
      { value: 'desconto', text: 'Desconto', plural: 'Descontos', help: '' },
      { value: 'despesa', text: 'Despesa', plural: 'Despesas', help: 'Despesas internas' },
      { value: 'gratificacao', text: 'Gratificação', plural: 'Gratificações', help: '' },
      { value: 'recebimento', text: 'Recebimento', plural: 'Recebimentos', help: '' },
      {
        value: 'outros_valores',
        text: 'Outros valores a receber',
        plural: 'Outros valores a receber',
        help: 'Laudo Médicos, Cartório, Adiantamentos e etc.'
      }
    ]
  }

  /* Calculo de Invalidez */
  static getTodosCalculoInvalidez(processo_id) {
    return api.get(`/processos/${processo_id}/calculo-invalidez`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvarCalculoInvalidez(processo_id, values) {
    if (values?.id) {
      return api.put(`/processos/${processo_id}/calculo-invalidez/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`/processos/${processo_id}/calculo-invalidez`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static deletarCalculoInvalidez(processo_id, process_disability_calculation_id) {
    return api.delete(
      `/processos/${processo_id}/calculo-invalidez/${process_disability_calculation_id}`,
      {
        validateStatus: (s) => s === 204
      }
    )
  }

  /**
   *  calculaControleEficienciaProcesso - Taxa de Sucesso do Processo
   * @param {object} processo
   * @param {Array} processo.calculos_invalidez Array que contem os dados de invalidez
   * @param {number} processo.importancia_segurada Valor de importancia para ser base de calculos
   * @returns {object} objecto de "controle_eficiencia" calculado
   */
  static calculaControleEficienciaCalculoInvalidez(processo) {
    const procentagem_proprio_total = UteisCalculoInvalidez.calcularTotalPorcentagem(
      processo.calculos_invalidez.filter((row) => row.tipo === 'proprio'),
      null
    )
    const procentagem_seguradora_total = UteisCalculoInvalidez.calcularTotalPorcentagem(
      processo.calculos_invalidez.filter((row) => row.tipo === 'seguradora'),
      null
    )

    const valor_proprio_esperado = procentagem_proprio_total
      ? parseFloat(
          Number(processo.importancia_segurada * (procentagem_proprio_total / 100)).toFixed(2)
        )
      : null
    const valor_seguradora_esperado = procentagem_seguradora_total
      ? parseFloat(
          Number(processo.importancia_segurada * (procentagem_seguradora_total / 100)).toFixed(2)
        )
      : null
    const diffPorcentagem = procentagem_seguradora_total / procentagem_proprio_total

    return {
      procentagem_proprio_total,
      valor_proprio_esperado,

      procentagem_seguradora_total,
      valor_seguradora_esperado,

      diferencia_valor_esperado:
        valor_seguradora_esperado === null || valor_proprio_esperado === null
          ? null
          : valor_seguradora_esperado - valor_proprio_esperado,
      diferencia_percentual:
        procentagem_seguradora_total === null || procentagem_proprio_total === null
          ? null
          : diffPorcentagem * 100 - 100
    }
  }

  /* Tarefas */
  static getTarefas(processo_id) {
    return api.get(`/processos/${processo_id}/tarefas`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarTarefas(processo_id, values) {
    return api.post(`/processos/${processo_id}/tarefas`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizarTarefas(processo_id, tarefa_id, values) {
    return api.put(`/processos/${processo_id}/tarefas/${tarefa_id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static deletarTarefas(processo_id, tarefa_id) {
    return api.delete(`/processos/${processo_id}/tarefas/${tarefa_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static getTodosProtocolos(processo_id) {
    return api.get(`/processos/${processo_id}/protocolos`, {
      validateStatus: (s) => s === 200
    })
  }

  /* Tarefas de Documentos */
  static getTodosDocumentoTarefas(processo_id) {
    return api.get(`/processos/${processo_id}/documento-tarefas`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarDocumentoTarefas(processo_id, values) {
    if (values.proxima_interacao_data) {
      values.proxima_interacao_data = values.proxima_interacao_data.format('YYYY-MM-DD')
    }

    return api.post(`/processos/${processo_id}/documento-tarefas`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static updateDocumentoTarefas(processo_id, processo_documento_tarefa_id, values) {
    let data = {}
    if (!values.documento_tarefa_id) {
      data = {
        ...values,
        proxima_interacao_data: values.proxima_interacao_data.format('YYYY-MM-DD')
      }
    } else {
      data.documento_tarefa_id = values.documento_tarefa_id
    }

    return api.put(
      `/processos/${processo_id}/documento-tarefas/${processo_documento_tarefa_id}`,
      data,
      {
        validateStatus: (s) => s === 200
      }
    )
  }

  static deletarDocumentoTarefas(processo_id, documento_tarefa) {
    return api.delete(`/processos/${processo_id}/documento-tarefas/${documento_tarefa}`, {
      validateStatus: (s) => s === 204
    })
  }

  static downloadDocumentos(processo_id, values, onProgress) {
    return api.post(`/files/documento-tarefas/processos/${processo_id}/download`, values, {
      validateStatus: (s) => s === 200,
      responseType: 'arraybuffer',
      onDownloadProgress: onProgress
    })
  }

  /* Acompanhamentos */
  static getTodosAcompanhamentos(processo_id) {
    return api.get(`/processos/${processo_id}/acompanhamentos`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarAcompanhamentos(processo_id, values) {
    values.proxima_interacao_data = values.proxima_interacao_data.format('YYYY-MM-DD')
    return api.post(`/processos/${processo_id}/acompanhamentos`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizarAcompanhamentos(processo_id, acompanhamento_id, values) {
    values.proxima_interacao_data = values.proxima_interacao_data.format('YYYY-MM-DD')
    return api.put(`/processos/${processo_id}/acompanhamentos/${acompanhamento_id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static deletarAcompanhamentos(processo_id, acompanhamento_id) {
    return api.delete(`/processos/${processo_id}/acompanhamentos/${acompanhamento_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static criarAcompanhamentosInteragir(processo_id, acompanhamento_id, values) {
    values.proxima_interacao_data = values?.proxima_interacao_data?.format('YYYY-MM-DD') || null
    return api.post(
      `/processos/${processo_id}/acompanhamentos/${acompanhamento_id}/interagir`,
      values,
      {
        validateStatus: (s) => s === 201
      }
    )
  }

  /* Beneficiarios */
  static getTodosBeneficiarios(processo_id) {
    return api.get(`/processos/${processo_id}/beneficiarios`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvarBeneficiariosVincular(processo_id, beneficiario_id) {
    return api.post(`/processos/${processo_id}/beneficiarios/${beneficiario_id}/vincular`, {
      validateStatus: (s) => s === 200
    })
  }

  static deletarBeneficiarioVinculado(processo_id, beneficiario_id) {
    return api.delete(`/processos/${processo_id}/beneficiarios/${beneficiario_id}/vincular`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default ProcessosDao
