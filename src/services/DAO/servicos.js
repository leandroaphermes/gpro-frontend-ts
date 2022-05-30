import api from '../api'

const prefix = '/servicos'

class ServicosDao {
  static getTodos(filtros) {
    return api.get(prefix, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static getPorID(id) {
    return api.get(`${prefix}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }

  static salvarRequisitos(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.servico_id}/requisitos/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}/${values.servico_id}/requisitos`, values, {
      validateStatus: (s) => s === 201
    })
  }

  /* Campos Personalizados */
  static salvarCampoPersonalizado(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.servico_id}/campos-personalizados/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}/${values.servico_id}/campos-personalizados`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static async salvarCampoPersonalizadoReorganizar(servico_id, values) {
    return api.put(`${prefix}/${servico_id}/campos-personalizados/reorganizar`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static async excluirCampoPersonalizado(servico_id, campo_id) {
    return api.delete(`${prefix}/${servico_id}/campos-personalizados/${campo_id}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default ServicosDao
