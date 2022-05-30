import api from '../api'

const rota = '/documento-tipos'
class DocumentoTiposDao {
  static getTodosAtivos() {
    return api.get(rota, {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get(rota, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
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

  static converterTipo(value) {
    const result = this.listaTipos().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { value: 'compartilhado', text: 'Documento Compartilhado' },
      { value: 'processo', text: 'Documento de Processo' }
    ]
  }
}

export default DocumentoTiposDao
