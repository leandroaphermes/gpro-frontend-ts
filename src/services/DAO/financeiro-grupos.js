import api from '../api'

class FinanceiroGruposDao {
  static getTodosAtivos() {
    return api.get('/financeiro-grupos', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/financeiro-grupos', {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/financeiro-grupos', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`/financeiro-grupos/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static getTodasContasAtivas() {
    return api.get('/financeiro-grupos/subgrupo/caixa', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static criarSubgrupo(id, values) {
    return api.post(`/financeiro-grupos/${id}/subgrupos`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizarSubgrupo(id, grupo_id, values) {
    return api.put(`/financeiro-grupos/${id}/subgrupos/${grupo_id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static converterTipo(tipo) {
    const result = this.listaTipos().find((item) => item.value === tipo)
    return result || { text: 'Desconhecido', textTransacao: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { value: 'entrada', text: 'Entrada', color: '#228800', textTransacao: 'Entrada' },
      { value: 'saida', text: 'Saída', color: '#FF5646', textTransacao: 'Saída' },
      { value: 'caixa', text: 'Caixa', color: '#2288FF', textTransacao: 'Transferência' }
    ]
  }
}

export default FinanceiroGruposDao
