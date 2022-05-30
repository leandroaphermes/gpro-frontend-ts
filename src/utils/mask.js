import { celularMask } from "masks-br";

export default class Mask {
  /**
   * Formata numero de telefone (X66) 98888-7777
   * @param {string|number} value Numero de telefone
   * @param {boolean} zero_init Se irá formatado com o 0 no DDD. Default: true
   * @returns {string} Retorna numero formatado
   */
  static telefone(value, zero_init = true) {
    const ret = String(value);

    if (
      !["0800", "0300"].includes(
        ret.replace(/\D/g, "").padStart(11, "0").substring(0, 4)
      )
    ) {
      return zero_init
        ? celularMask(ret).replace(/([0-9]{2}\)\s[0-9-]+)/, "0$1")
        : celularMask(ret);
    }

    return ret
      .replace(/\D/g, "")
      .padStart(11, "0")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{3})(\d{3})/, "$1 $2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  static telefoneOnlyNumber(tel) {
    return parseInt(String(tel).replace(/[^0-9]+/g, ""));
  }

  static cpf(cpf, char = "-") {
    return cpf
      ? String(cpf)
          .padStart(11, "0")
          .replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/, (...ag) => {
            return `${ag[1]}.${ag[2]}.${ag[3]}-${ag[4]}`;
          })
      : char;
  }

  static cnpj(cnpj) {
    return String(cnpj)
      .padStart(14, "0")
      .replace(
        /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/,
        (...ag) => {
          return `${ag[1]}.${ag[2]}.${ag[3]}/${ag[4]}-${ag[5]}`;
        }
      );
  }

  static dateBR(date) {
    return date.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, "$3-$2-$1");
  }

  static dinheiro(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  static porcentagem(value) {
    const val = new Intl.NumberFormat("pt-BR", {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(value / 100);
    return val;
  }

  static cep(cep) {
    // 99999999
    if (!cep) return null;
    return String(cep)
      .padStart(8, "0")
      .replace(/([0-9]{5})([0-9]{3})/, (ag) => {
        return `${ag[0]}-${ag[1]}`;
      });
  }
}
