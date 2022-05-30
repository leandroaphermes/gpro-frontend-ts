import api from '../api'

const rota = '/documento-locais'

class DocumentoLocaisDao {
  static getTodosAtivos(filtros) {
    return api.get(rota, {
      params: { status_registro: 'A', ...filtros },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos(filtros) {
    return api.get(rota, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static getPorID(id) {
    return api.get(`${rota}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    values.telefones = values.telefones.map((tel) => {
      tel.num = parseInt(`${tel.num}`.replace(/[^0-9]+/g, ''))
      return tel
    })

    if (values.id > 0) {
      // se ja tem id, atualiza
      return api.put(`${rota}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(rota, values, {
      validateStatus: (s) => s === 201
    })
  }

  static converterOpcaoDia(value) {
    const result = this.listaOpcaoDias().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaOpcaoDias() {
    return [
      { text: 'Segunda', value: 'segunda' },
      { text: 'Terca', value: 'terca' },
      { text: 'Quarta', value: 'quarta' },
      { text: 'Quinta', value: 'quinta' },
      { text: 'Sexta', value: 'sexta' },
      { text: 'Sabado', value: 'sabado' },
      { text: 'Domingo', value: 'domingo' }
    ]
  }

  static converterTipo(value) {
    const result = this.listaTipos().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { text: 'Presencial', value: 'presencial' },
      { text: 'Telefone', value: 'telefone' },
      { text: 'Email', value: 'email' },
      { text: 'Site', value: 'site' }
    ]
  }

  static getTodosHistoricos(id) {
    return api.get(`/documento-locais/${id}/historicos`, {
      validateStatus: (s) => s === 200
    })
  }

  static criarHistoricos(id, values) {
    return api.post(`/documento-locais/${id}/historicos`, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default DocumentoLocaisDao
