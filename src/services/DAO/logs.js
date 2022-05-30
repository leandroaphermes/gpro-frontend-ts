import api from '../api'

class LogsDao {
  static getTodos(values) {
    if (Array.isArray(values.range_datas)) {
      values.range_datas = [values.range_datas[0].format('YYYY-MM-DD'), values.range_datas[1].format('YYYY-MM-DD')]
    }

    return api.get(`/logs`, {
      params: values,
      validateStatus: (s) => s === 200
    })
  }

  static converterTabela(value) {
    const result = this.listaTabela().find((item) => item.value === value)
    return result || { name: 'Desconhecido' }
  }

  static listaTabela() {
    return [{ label: 'Administrador', value: 'admin' }]
  }
}

export default LogsDao
