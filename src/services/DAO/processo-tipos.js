import api from '../api'

const prefix = '/processo-tipos'

class ProcessoTiposDao {
  static getTodosAtivos() {
    return api.get(prefix, {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get(prefix, {
      validateStatus: (s) => s === 200
    })
  }

  static getPorId(id) {
    return api.get(`/processo-tipos/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    return api.put(`${prefix}/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static converterModosExtras(type) {
    const result = this.listaModosExtras().find((item) => item.value === type)
    return result || { label: 'Desconhecido' }
  }

  static listaModosExtras() {
    return [{ label: 'Calculo de Invalidez', value: 'calculo_invalidez', isPremium: true }]
  }

  /* Estagio */
  static salvarEstagio(id, values) {
    if (values.prazo_medio < 1) values.prazo_medio = null
    if (values.prazo_maximo < 1) values.prazo_maximo = null

    if (values?.id) {
      return api.put(`${prefix}/${id}/estagios/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}/${id}/estagios`, values, {
      validateStatus: (s) => s === 201
    })
  }

  /* Campos Personalizados */
  static salvarCampoPersonalizado(processo_tipo_id, values, atualizar) {
    if (atualizar) {
      return api.put(
        `${prefix}/${processo_tipo_id}/campos-personalizados/${values.campo_personalizado_id}`,
        values,
        {
          validateStatus: (s) => s === 200
        }
      )
    }
    return api.post(`${prefix}/${processo_tipo_id}/campos-personalizados`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static salvarCampoPersonalizadoReorganizar(id, values) {
    return api.put(`${prefix}/${id}/campos-personalizados/reorganizar`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static excluirCampoPersonalizado(id, campo_id) {
    return api.delete(`${prefix}/${id}/campos-personalizados/${campo_id}`, {
      validateStatus: (s) => s === 200
    })
  }
}

export default ProcessoTiposDao
