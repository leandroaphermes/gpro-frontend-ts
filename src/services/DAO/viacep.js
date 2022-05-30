import axios from 'axios'

class Viacep {
  static async getInfo(cep) {
    cep = cep.replace(/[^0-9]/g, '')
    const response = await axios(`https://viacep.com.br/ws/${cep}/json`, {
      validateStatus: (s) => s === 200,
      timeout: 4000
    })

    if (response.data.erro) throw new Error('NotFound')

    return response.data
  }
}

export default Viacep
