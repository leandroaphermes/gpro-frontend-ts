class UteisCalculoInvalidez {
  static porcentagemIS(porcentagem_maxima, porcentagem) {
    return (porcentagem_maxima / 100) * porcentagem
  }

  /**
   * Calcula todos os valores de invalidez
   * @param {array} invalidez[]
   * @returns {number} total de %
   */
  static calcularTotalPorcentagem(invalidez, initial = 0) {
    const total = invalidez.reduce((ac, cv) => {
      return ac + this.porcentagemIS(cv.tabela_invalidez.porcentagem_maxima, cv.porcentagem)
    }, initial)
    return total > 100 ? 100 : total
  }
}

export default UteisCalculoInvalidez
