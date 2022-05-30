class UteisCalculoProcessoIndenizacoes {
  /**
   * Calcula valor de indenização
   * @param {number} valorCobertura Porcentagem cobrada
   * @param {number} percentualInvalidezIS Porcentagem de Invalidez IS
   * @returns {number} Retorna valor de indenização
   */
  static calculaIndenizacao(valorCobertura, percentualInvalidezIS) {
    const valorIndelizacao = valorCobertura * (percentualInvalidezIS / 100)
    return valorIndelizacao > valorCobertura ? valorCobertura : valorIndelizacao
  }

  /**
   * Calcula valor de comissão
   * @param {number} valorIndenizacao Valor ja calculado de indenização
   * @param {number} percentualCobrado Porcentagem de comissão
   * @returns {number} Retorna valor de comissão
   */
  static calculaComissao(valorIndenizacao, percentualCobrado) {
    return (valorIndenizacao * percentualCobrado) / 100
  }

  /**
   * Calcula valor de comissão pelo valor de cobertura
   * @param {number} valorCobertura Porcentagem cobrada
   * @param {number} percentualInvalidezIS Porcentagem de Invalidez IS
   * @param {number} percentualCobrado Porcentagem de comissão
   * @returns {number} Retorna valor de comissão
   */
  static calculaComissaoPeloValorCobertura(
    valorCobertura,
    percentualInvalidezIS,
    percentualCobrado
  ) {
    return (
      (this.calculaIndenizacao(valorCobertura, percentualInvalidezIS) * percentualCobrado) / 100
    )
  }
}

export default UteisCalculoProcessoIndenizacoes
