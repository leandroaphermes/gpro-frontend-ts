import api from '../api'

class DocumentoTarefasDao {
  static getTodos(params = {}) {
    return api.get('/documento-tarefas', {
      params,
      validateStatus: (s) => s === 200
    })
  }

  static criar(values) {
    return api.post('/documento-tarefas', values, {
      validateStatus: (s) => s === 201
    })
  }

  static atualizar(id, values) {
    values.documento_local_id = values?.documento_local_id || null
    values.proxima_interacao_data = values.proxima_interacao_data.format('YYYY-MM-DD')

    return api.put(`/documento-tarefas/${id}`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarInteragir(id, values) {
    values.proxima_interacao_data = values.proxima_interacao_data.format('YYYY-MM-DD')

    return api.put(`/documento-tarefas/${id}/interagir`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static uploadFileDocumento(id, form, options) {
    return api.post(`/files/documento-tarefas/${id}/documento`, form, {
      ...options,
      validateStatus: (s) => s === 201
    })
  }

  static downloadFileDocumento(id) {
    return api.get(`/files/documento-tarefas/${id}/documento`, {
      validateStatus: (s) => s === 200
    })
  }

  static deleteFileDocumento(id) {
    return api.delete(`/files/documento-tarefas/${id}/documento`, {
      validateStatus: (s) => s === 204
    })
  }



  /* Progressos */
  static getTodosProgressos(id) {
    return api.get(`/documento-tarefas/${id}/documento-progressos`, {
      validateStatus: (s) => s === 200
    })
  }
}

export default DocumentoTarefasDao
