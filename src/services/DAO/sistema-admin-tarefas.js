import api from '../api'

class SistemaAdminTarefasDao {
  static getTodosPendente() {
    return api.get('/sistema-admin-tarefas', {
      params: { status: 'pendente' },
      validateStatus: (s) => s === 200
    })
  }

  static getAll() {
    return api.get('/sistema-admin-tarefas', {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/sistema-admin-tarefas', values, {
      validateStatus: (s) => s === 201
    })
  }

  static async aceito(id) {
    return api.put(`/sistema-admin-tarefas/${id}/aceito`, {
      validateStatus: (s) => s === 200
    })
  }

  static rejeitado(id) {
    return api.put(`/sistema-admin-tarefas/${id}/rejeitado`, {
      validateStatus: (s) => s === 200
    })
  }

  static converterStatus(value) {
    const result = this.listaStatus().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaStatus() {
    return [
      { value: 'pendente', text: 'Pendente', color: 'error' },
      { value: 'aceito', text: 'Concluido', color: 'success' },
      { value: 'rejeitado', text: 'Rejeitado', color: 'default' }
    ]
  }

  static converterTipo(value) {
    const result = this.listaTipos().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { value: 'impossibilitar', text: 'Impossibilitar' },
      { value: 'aceitar', text: 'Aceitar' },
      { value: 'excluir', text: 'Excluir' },
      { value: 'finalizar', text: 'Arquivar' },
      { value: 'arquivar', text: 'Arquivar' }
    ]
  }

  static converterTipoRegistro(value) {
    const result = this.listaTipoRegistros().find((item) => item.value === value)
    return result || { text: 'Desconhecido' }
  }

  static listaTipoRegistros() {
    return [
      { value: 'cliente', text: 'Cliente', link: 'clientes' },
      { value: 'ligacao', text: 'Ligação', link: 'clientes' },
      { value: 'processo', text: 'Processo', link: 'processos' },
      { value: 'financeiro_lancamento', text: 'Lançamento Financeiro', link: false },
      { value: 'oportunidade', text: 'Oportunidade', link: 'oportunidades' },
      { value: 'agenda_evento', text: 'Agendamento', link: false }
    ]
  }
}

export default SistemaAdminTarefasDao
