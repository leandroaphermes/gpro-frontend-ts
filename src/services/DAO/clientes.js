import api from '../api'
import OportunidadesDao from './oportunidades'
import ProcessosDao from './processos'

const prefix = 'clientes'

class ClientesDao {
  static getBuscar(filtros) {
    return api.get(prefix, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static getBasico(filtros) {
    return api.get(`${prefix}/basico`, {
      params: filtros,
      validateStatus: (s) => s === 200
    })
  }

  static getPorID(id) {
    return api.get(`${prefix}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static getPorCPF(cpf) {
    return this.getBasico({ pesquisa: cpf, coluna: 'cpf' })
  }

  static getPorTelefone(telefone) {
    return this.getBasico({ pesquisa: telefone, coluna: 'telefone' })
  }

  static criar(values) {
    values.nascimento_data = values.nascimento_data
      ? values.nascimento_data.format('YYYY-MM-DD')
      : null
    values.telefones = values.telefones.map((tel) => {
      tel.num = parseInt(`${tel.num}`.replace(/[^0-9]+/g, ''))
      return tel
    })
    values.cpf = parseInt(`${values.cpf}`.replace(/[^0-9]+/g, '')) || null

    return api.post(prefix, values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    values.nascimento_data = values.nascimento_data
      ? values.nascimento_data.format('YYYY-MM-DD')
      : null
    values.telefones = values.telefones.map((tel) => {
      tel.num = parseInt(`${tel.num}`.replace(/[^0-9]+/g, ''))
      return tel
    })
    values.cpf = parseInt(`${values.cpf}`.replace(/[^0-9]+/g, '')) || null

    return api.put(`${prefix}/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static deletar(id) {
    return api.delete(`${prefix}/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static reativarCliente(id) {
    return api.put(`${prefix}/${id}/reativar`, {
      validateStatus: (s) => s === 204
    })
  }

  static atualizarMarcadores(id, values) {
    return api.put(`${prefix}/${id}/marcadores`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarVincularTelefones(clienteId, recebeClienteId) {
    return api.put(`${prefix}/${clienteId}/vincular-telefones/${recebeClienteId}`, {
      validateStatus: (s) => s === 200
    })
  }

  /* Icon */
  static getUrlAvatar(id, cancelRequest) {
    return api.get(`/files/${prefix}/${id}/avatar`, {
      validateStatus: (s) => s === 200,
      signal: cancelRequest.signal
    })
  }

  static setUrlAvatar(id, form, options) {
    return api.post(`/files/${prefix}/${id}/avatar`, form, options, {
      validateStatus: (s) => s === 201
    })
  }

  static removeUrlAvatar(id) {
    return api.delete(`/files/${prefix}/${id}/avatar`, {
      validateStatus: (s) => s === 204
    })
  }

  /* Relationships */

  /* Processos */
  static async getTodosProcessos(id) {
    return api
      .get(`${prefix}/${id}/processos`, {
        validateStatus: (s) => s === 200
      })
      .then((response) => ({
        ...response,
        data: response.data.map((row) => ProcessosDao.calculaTudo(row))
      }))
  }

  /* Oportunidades */
  static async getTodosOportunidades(id) {
    return api
      .get(`${prefix}/${id}/oportunidades`, {
        validateStatus: (s) => s === 200
      })
      .then((response) => ({
        ...response,
        data: response.data.map((rowData) => OportunidadesDao.calculaTudo(rowData))
      }))
  }

  /* Documentos */
  static getTodosAnexos(id) {
    return api.get(`${prefix}/${id}/documentos`, {
      validateStatus: (s) => s === 200
    })
  }

  /* Galeria */
  static getTodosGaleria(id) {
    return api.get(`${prefix}/${id}/galerias`, {
      validateStatus: (s) => s === 200
    })
  }

  /* Anexos Arquivos */
  static getAnexos(cliente_id, id) {
    return api.get(`/files/${prefix}/${cliente_id}/documentos/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static setAnexos(cliente_id, documento_tipo_id, form, options) {
    return api.post(
      `/files/${prefix}/${cliente_id}/documentos?documento_tipo_id=${documento_tipo_id}`,
      form,
      {
        ...options,
        validateStatus: (s) => s === 201
      }
    )
  }

  static delAnexos(cliente_id, id) {
    return api.delete(`/files/${prefix}/${cliente_id}/documentos/${id}`, {
      validateStatus: (s) => s === 204
    })
  }

  /* Galeria Arquivos */
  static getGaleria(cliente_id, id) {
    return api.get(`/files/${prefix}/${cliente_id}/galerias/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static setGaleria(cliente_id, form, options) {
    return api.post(`/files/${prefix}/${cliente_id}/galerias`, form, options)
  }

  static delGaleria(cliente_id, id) {
    return api.delete(`/files/${prefix}/${cliente_id}/galerias/${id}`, {
      validateStatus: (s) => s === 204
    })
  }
}

export default ClientesDao
