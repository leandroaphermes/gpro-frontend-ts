import api from '../api'

const prefix = "/contrato-modelos"

class ContratoModelosDao {

  static getTodosAtivos() {
    return api.get(`${prefix}`, {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get(`${prefix}`, {
      validateStatus: (s) => s === 200
    })
  }

  static getByID(id) {
    return api.get(`${prefix}/${id}`, {
      validateStatus: (s) => s === 200
    })
  }

  static salvar(values) {
    if(values?.id){
      return api.put(`${prefix}/${values.id}`, values, {
        validateStatus: (s) => s === 200
      })
    }
    return api.post(`${prefix}`, values, {
      validateStatus: (s) => s === 201
    })
  }
}

export default ContratoModelosDao
