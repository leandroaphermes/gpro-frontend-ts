import api from '../api'

const prefixRouter = '/empregadores'

class EmpregadoresDao {
  /**
   * Traz todos os empregadores
   * @param {string} buscar Texto buscado
   * @param {"nome_fantasia"|"razao_social"|"cnpj"} coluna
   * @returns
   */
  static getBuscar(buscar, coluna) {
    if (coluna === 'cnpj') buscar = String(buscar).replace(/[^0-9]/g, '')

    return api.get(prefixRouter, {
      params: {
        buscar,
        coluna
      },
      validateStatus: (s) => s === 200
    })
  }

  static getPorId(id) {
    return api.get(`${prefixRouter}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/empregadores', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`${prefixRouter}/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static deletar(id) {
    return api.delete(`${prefixRouter}/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  /* Trabalhadores */
  static getTodosTrabalhadores(empregador_id) {
    return api.get(`${prefixRouter}/${empregador_id}/trabalhadores`, {
      validateStatus: (s) => s === 200
    })
  }

  /* Apolice */
  static salvarApolice(empregador_id, values) {
    values.vigencia_inicio = values.dt_range_vigencia?.[0]
      ? values.dt_range_vigencia[0].format('YYYY-MM-DD')
      : null
    values.vigencia_final = values.dt_range_vigencia?.[1]
      ? values.dt_range_vigencia[1].format('YYYY-MM-DD')
      : null

    if (values?.id) {
      return api.put(`${prefixRouter}/${empregador_id}/apolices/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefixRouter}/${empregador_id}/apolices`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static converterApoliceCobertura(value) {
    const result = this.listaApoliceCoberturas().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaApoliceCoberturas() {
    return [
      { value: 'morte_natural', text: 'Morte Natural' },
      { value: 'morte_natural_acidental', text: 'Morte Natural e Acidental' },
      { value: 'ipa_invalidez_funcional_doenca', text: 'IFD - Invalidez Funcional por Doença' },
      { value: 'ipa_invalidez_total_acidente', text: 'IPA - Invalidez Total por Acidente' },
      {
        value: 'ipa_invalidez_total_parcial_acidente',
        text: 'IPA - Invalidez Total e Parcial por Acidente'
      },
      {
        value: 'ipd_invalidez_total_parcial_doenca',
        text: 'IPD - Invalidez Total e Parcial por Doença'
      },
      {
        value: 'ipd_invalidez_total_doenca',
        text: 'IPD - Invalidez Total por Doença'
      },
      {
        value: 'dih_diarias_internacao_hospital',
        text: 'DIH - Diarias por Internação Hospitalar'
      }
    ]
  }

  /* Apolice Documento */
  static getApoliceDocumento(empregador_id, uid) {
    return api.get(`/files/empregadores/${empregador_id}/apolices/${uid}`, {
      validateStatus: (s) => s === 200
    })
  }

  static setApoliceDocumento(empregador_id, form, options) {
    return api.post(`/files/empregadores/${empregador_id}/apolices`, form, {
      ...options,
      validateStatus: (s) => s === 201
    })
  }

  static delApoliceDocumento(empregador_id, uid) {
    return api.delete(`/files/empregadores/${empregador_id}/apolices/${uid}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default EmpregadoresDao
