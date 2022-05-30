import api from '../api'

class FinanceiroOperacoesFavoritasDao {
  static getTodos() {
    return api.get('/financeiro-operacoes-favoritas', {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(id, values) {
    if (!Array.isArray(values.origem_id) && values.origem_id.length !== 2) {
      throw new Error('Erro ao direcionar os indices de Origem')
    }
    if (!Array.isArray(values.destino_id) && values.destino_id.length !== 2) {
      throw new Error('Erro ao direcionar os indices de Destino')
    }

    const [origem_grupo_id, origem_subgrupo_id] = values.origem_id
    values.origem_grupo_id = origem_grupo_id
    values.origem_subgrupo_id = origem_subgrupo_id

    const [destino_grupo_id, destino_subgrupo_id] = values.destino_id
    values.destino_grupo_id = destino_grupo_id
    values.destino_subgrupo_id = destino_subgrupo_id

    if (id) {
      return api.put(`/financeiro-operacoes-favoritas/${id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post('/financeiro-operacoes-favoritas', values, {
      validateStatus: (s) => s === 201
    })
  }

  static deletar(id) {
    return api.delete(`/financeiro-operacoes-favoritas/${id}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default FinanceiroOperacoesFavoritasDao
