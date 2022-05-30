import UteisCalculoProcessoIndenizacoes from './calculoProcessoIndenizacoes'

class UteisCalculoOportunidadePontos {
  /**
   * Calcula apenas um serviço e trans valores de indenização, comissao e pontos
   * @param {number} valorCobertura Valor da cobertura do serviço
   * @param {number} percentualInvalidezIS Percentual total da invalidez IS
   * @param {number} percentualCobrado Percentual cobrado pelo comissão
   * @param {number} multiplicador Multiplicador de bonus
   * @returns {{ indenizacao: number, comissao: number, pontos: number, cobertura: number }} Valores do serviço
   */
  static calculaPontosServico(
    valorCobertura,
    percentualInvalidezIS,
    percentualCobrado,
    multiplicador
  ) {
    const indenizacao = UteisCalculoProcessoIndenizacoes.calculaIndenizacao(
      valorCobertura,
      percentualInvalidezIS
    )
    const comissao = UteisCalculoProcessoIndenizacoes.calculaComissao(
      indenizacao,
      percentualCobrado
    )
    return {
      indenizacao,
      comissao,
      pontos: this.calculaPontos(comissao * multiplicador),
      cobertura: valorCobertura
    }
  }

  /**
   * Calcula todos os valores e pontos de uma oportunidade
   * @param {array<{ valor_cobertura: number, servico: { multiplicador: number }  }>} servicos Lista com os serviços
   * @param {number} percentualCobrado Porcentagem cobrada
   * @param {number} percentualInvalidezIS Porcentagem de Invalidez IS
   * @param {{ indenizacao: number, comissao: number, pontos: number, cobertura: number }} initial Valores iniciais 0
   * @returns {{ indenizacao: number, comissao: number, pontos: number, cobertura: number }} Objeto contendo o total de todos os valores
   */
  static calcularPontosServicoTotal(
    servicos,
    percentualCobrado,
    percentualInvalidezIS,
    initial = { indenizacao: 0, comissao: 0, pontos: 0, cobertura: 0 }
  ) {
    const { pontos: pontosCalcu, ...restResult } = servicos.reduce((ac, cv) => {
      const { indenizacao, comissao, pontos, cobertura } = this.calculaPontosServico(
        cv.valor_cobertura,
        percentualInvalidezIS,
        percentualCobrado,
        cv.servico.multiplicador
      )
      return {
        indenizacao: ac.indenizacao + indenizacao,
        comissao: ac.comissao + comissao,
        pontos: ac.pontos + pontos,
        cobertura: ac.cobertura + cobertura
      }
    }, initial)

    return { ...restResult, pontos: Number(Number(pontosCalcu).toFixed(1)) }
  }

  static calculaPontos(valor) {
    return Number(Number(valor / 1000).toFixed(1))
  }
}

export default UteisCalculoOportunidadePontos
