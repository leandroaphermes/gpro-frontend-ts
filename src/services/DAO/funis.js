import api from '../api'

const prefix = '/funis'

class FunisDao {
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

  /* Etapas */
  static salvarEtapa(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.funil_id}/etapas/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}/${values.funil_id}/etapas`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static async salvarEtapaReorganizar(funil_id, id, values) {
    return api.put(`${prefix}/${funil_id}/etapas/${id}/reorganizar`, values, {
      validateStatus: (s) => s === 200
    })
  }

  /* Campos Personalizados */
  static salvarCampoPersonalizado(values) {
    if (values.id) {
      return api.put(`${prefix}/${values.funil_id}/campos-personalizados/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}/${values.funil_id}/campos-personalizados`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static async salvarCampoPersonalizadoReorganizar(funil_id, values) {
    return api.put(`${prefix}/${funil_id}/campos-personalizados/reorganizar`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static async excluirCampoPersonalizado(funil_id, campo_id) {
    return api.delete(`${prefix}/${funil_id}/campos-personalizados/${campo_id}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default FunisDao
