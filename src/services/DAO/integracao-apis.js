import api from '../api'

const rota = '/integracao-apis'

class IntegracaoApisDao {

  static getTodos() {
    return api.get(rota, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if (values?.id > 0) {
      return api.put(`${rota}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(rota, values, {
      validateStatus: (s) => s === 201
    })
  }

  static listaTipos(){
    return [
      { text: "GigaChat", value: "gigachat", url_post: "" },
      { text: "ZapGuru", value: "zapguru", url_post: "" },
    ]
  }

}

export default IntegracaoApisDao
