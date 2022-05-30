import moment from 'moment'

import api from '../api'

const prefix = '/clientes-questionarios'

class ClienteQuestionariosDao {
  static getTodos(cliente_id) {
    return api.get(`${prefix}/${cliente_id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static getByID(cliente_id, questionario_id) {
    return api.get(`${prefix}/${cliente_id}/questionario/${questionario_id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(cliente_id, values) {
    values.sessoes = this.toAPI([...values.sessoes])
    if (values?.id) {
      return api.put(`${prefix}/${cliente_id}/questionario/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}/${cliente_id}`, values, {
      validateStatus: (s) => s === 201
    })
  }

  static excluir(cliente_id, questionario_id) {
    return api.delete(`${prefix}/${cliente_id}/questionario/${questionario_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static bloquear(cliente_id, questionario_id) {
    return api.put(`${prefix}/${cliente_id}/questionario/${questionario_id}/bloquear`, {
      validateStatus: (s) => s === 200
    })
  }

  static desbloquear(cliente_id, questionario_id) {
    return api.put(`${prefix}/${cliente_id}/questionario/${questionario_id}/desbloquear`, {
      validateStatus: (s) => s === 200
    })
  }

  /**
   * Converte as sessões do questionario para envio em API
   * @param {Array} sessoes Lista de sessoes
   * @returns Retorna uma lista de sessoes convertidas para envio
   */
  static toAPI(sessoes) {
    return sessoes.map((row) => ({
      ...row,
      campos: row.campos.map((row_campo) => {
        switch (row_campo.type) {
          case 'boolean':
            row_campo.value = !!row_campo.value
            break
          case 'date':
            row_campo.value = row_campo.value ? row_campo.value.format('YYYY-MM-DD') : null
            break
          case 'datetime':
            row_campo.value = row_campo.value ? row_campo.value.format('YYYY-MM-DD HH:mm:ss') : null
            break

          default:
            row_campo.value = row_campo.value || null
            break
        }
        return row_campo
      })
    }))
  }

  static toForm(sessoes) {
    return sessoes.map((row) => ({
      ...row,
      campos: row.campos.map((row_campo) => {
        const novo = {}
        switch (row_campo.type) {
          case 'boolean':
            novo.value = !!row_campo.value
            break
          case 'date':
          case 'datetime':
            novo.value = row_campo.value ? moment(row_campo.value) : null
            break

          default:
            novo.value = row_campo.value || null
            break
        }
        return {
          ...row_campo,
          ...novo
        }
      })
    }))
  }
}

export default ClienteQuestionariosDao
