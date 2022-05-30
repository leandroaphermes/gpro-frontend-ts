import api from '../api'

class MeDao {
  static getInfo() {
    return api.get('/me', {
      validateStatus: (s) => s === 200
    })
  }

  static update(values) {
    return api.put(`/me`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static updateRenovarTokenGpro() {
    return api.put(`/me/renovar-token-gpro`, {
      validateStatus: (s) => s === 200
    })
  }

  static alterarMinhaSenha(values) {
    return api.put(`/me/alterar-minha-senha`, values, {
      validateStatus: (s) => s === 200
    })
  }

  static vincularUsuarioParaEmpresa(values) {
    values.cpf = parseInt(`${values.cpf}`.replace(/[^0-9]+/g, '')) || null
    return api.post(`/me/usuarios`, values, {
      validateStatus: (s) => s === 201 || s === 202
    })
  }

  static atualizarUsuarioParaEmpresa(user_id, values) {
    values.cpf = parseInt(`${values.cpf}`.replace(/[^0-9]+/g, '')) || null
    return api.put(`/me/usuarios/${user_id}`, values, {
      validateStatus: (s) => s === 204
    })
  }

  static removerUsuarioParaEmpresa(user_id) {
    return api.delete(`/me/usuarios/${user_id}`, {
      validateStatus: (s) => s === 204
    })
  }

  static reativarUsuarioParaEmpresa(user_id) {
    return api.put(`/me/usuarios/${user_id}/reativar`, {
      validateStatus: (s) => s === 204
    })
  }

  static newPasswordUsuarioParaEmpresa(user_id) {
    return api.put(`/me/usuarios/${user_id}/senha`, {
      validateStatus: (s) => s === 204
    })
  }

  static getCalcularDiscoUtilizado() {
    return api.get(`/me/calcular-disco-utilizado`, {
      validateStatus: (s) => s === 200
    })
  }

  static atualizarUsuarioPreferencia(values) {
    return api.put(`/me/salvar-preferencia`, values, {
      validateStatus: (s) => s === 200
    })
  }
}

export default MeDao
