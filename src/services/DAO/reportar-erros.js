import api from '../api'

export default class ReportarErros {
  static storeErrorBoundaries(erros) {
    return api.post('/reportar-erros/frontend-global', erros, {
      validateStatus: (s) => s === 201
    })
  }
}
