import api from '../api'

const rota = '/campos-personalizados'

class CamposPersonalizadosDao {
  static getTodosAtivos() {
    return api.get('/campos-personalizados', {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get('/campos-personalizados', {
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

  static excluir(id) {
    return api.delete(`/campos-personalizados/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static converterTipos(tipos) {
    const result = this.listaTipos().find((item) => item.value === tipos)
    return result || { label: 'Desconhecido' }
  }

  static listaTipos() {
    return [
      { label: 'Sim/Não', value: 'boolean', group: null },
      { label: 'Data', value: 'date', group: null },
      { label: 'Data e Hora', value: 'datetime', group: null },
      { label: 'Numero', value: 'number', group: null },
      { label: 'Valor em R$', value: 'value', group: null },
      { label: 'Texto Curto', value: 'text', group: null },
      { label: 'Area Texto Grande', value: 'textarea', group: null },

      { label: 'Lista de Opções', value: 'options_unique', group: null },

      { label: 'Usuarios do Sistema', value: 'usuario', group: 'Lista' },
      { label: 'Empregadores Cadastrados', value: 'empregador', group: 'Lista' },
      { label: 'Local de Pericia', value: 'pericia_local', group: 'Lista' },
      { label: 'Locais de Captação', value: 'captador_local', group: 'Lista' },
      { label: 'Captadores', value: 'captador_captador', group: 'Lista' },
      { label: 'Seguradoras', value: 'seguradora', group: 'Lista' },
      { label: 'Socorristas', value: 'socorrista', group: 'Lista' },
      { label: 'Advogados', value: 'advogado', group: 'Lista' }
    ]
  }
}

export default CamposPersonalizadosDao
