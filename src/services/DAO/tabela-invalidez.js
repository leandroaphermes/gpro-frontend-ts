import api from '../api'

const prefix = '/tabela-invalidez'

class TabelaInvalidezdAO {
  static getTodosAtivos(filtros) {
    return api.get(prefix, {
      params: { ...filtros, status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos(filtros) {
    return api.get(prefix, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id > 0) {
      // se ja tem id, atualiza
      return api.put(`${prefix}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }

  static listaTipos() {
    return [
      { text: 'Processo', value: 'processo' },
      { text: 'Oportunidade', value: 'oportunidade' }
    ]
  }

  static converterTipo(value) {
    const result = this.listaTipos().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }
}

export default TabelaInvalidezdAO
