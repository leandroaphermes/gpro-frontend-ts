import isEmpty from 'lodash/isEmpty'
import api from '../api'
import { getSessaoUsuario } from '../localSessao'

class AuthDao {
  static autenticar(email, senha) {
    return api.post(
      '/auth',
      { email, senha },
      {
        validateStatus: (s) => s === 200
      }
    )
  }

  static validaAutenticacao(sessao) {
    return !isEmpty(getSessaoUsuario()) && sessao.autenticado
  }

  /**
   *
   * @param {object} usuario_permissao
   * @param {array} router_permissao
   * @return {boolean} boolean
   */
  static validaPermissao(usuario_permissao, rota_permissao = []) {
    if (rota_permissao.length === 0) return true
    if (usuario_permissao.admin) return true
    const allowed = []

    rota_permissao.forEach((permissao) => {
      if (permissao === 'processo_tipo_*') {
        allowed.push(true)
      } else if (usuario_permissao[permissao]) allowed.push(true)
    })

    return !!allowed.length
  }

  /**
   * Tras todas as permissoes ativas que passarem no filtro caso tiver
   * @param {object} permissoes Obejeto de permissoes do usuario autenticado
   * @param {function} filter Função de validar com a chave
   * @returns {string[]} Array das permissoes ativas
   */
  static getPermissoesAtivas(permissoes, filter) {
    const ativas = []
    Object.entries(permissoes)
      .filter((v) => v[1])
      .forEach(([key, value]) => {
        if (typeof filter === 'function') {
          if (filter(key, value)) ativas.push(key)
        } else {
          ativas.push(key)
        }
      })
    return ativas
  }

  static getValidarToken() {
    return api.get('/auth/validar', {
      validateStatus: (s) => s === 200
    })
  }
}

export default AuthDao
