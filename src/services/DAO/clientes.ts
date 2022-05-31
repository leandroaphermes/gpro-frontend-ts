import moment from "moment";

import api from "../api";
import OportunidadesDao from "./oportunidades";
import ProcessosDao from "./processos";

import {
  ClienteFiltroListaQueryType,
  ClienteFormType,
  ClienteRequestType,
  ClienteUniqKey,
} from "types/cliente";
import { AxiosRequestHeaders } from "axios";

const prefix = "clientes";

class ClientesDao {
  static getBuscar(filtros: ClienteFiltroListaQueryType) {
    return api.get(prefix, {
      params: filtros,
      validateStatus: (s) => s === 200,
    });
  }

  static getBasico(filtros: ClienteFiltroListaQueryType) {
    return api.get(`${prefix}/basico`, {
      params: filtros,
      validateStatus: (s) => s === 200,
    });
  }

  static getPorID(id: ClienteUniqKey) {
    return api.get(`${prefix}/${id}`, {
      validateStatus: (s) => s === 200,
    });
  }

  static getPorCPF(cpf: number) {
    return this.getBasico({ pesquisa: cpf, coluna: "cpf" });
  }

  static getPorTelefone(telefone: number) {
    return this.getBasico({ pesquisa: telefone, coluna: "telefone" });
  }

  static salvar(values: ClienteFormType) {
    const novosValores: ClienteRequestType = {
      ...values,
      nascimento_data: values.nascimento_data
        ? values.nascimento_data.format(moment.HTML5_FMT.DATE)
        : null,
    };

    if (novosValores?.id) {
      return api.put(`${prefix}/${novosValores.id}`, novosValores, {
        validateStatus: (s) => s === 200,
      });
    }

    return api.post(prefix, values, {
      validateStatus: (s) => s === 201,
    });
  }

  static deletar(id: ClienteUniqKey) {
    return api.delete(`${prefix}/${id}`, {
      validateStatus: (s) => s === 204,
    });
  }

  static reativarCliente(id: ClienteUniqKey) {
    return api.put(`${prefix}/${id}/reativar`, undefined, {
      validateStatus: (s) => s === 204,
    });
  }

  static atualizarMarcadores(
    id: ClienteUniqKey,
    values: ClienteRequestType["marcadores"]
  ) {
    return api.put(`${prefix}/${id}/marcadores`, values, {
      validateStatus: (s) => s === 200,
    });
  }

  static atualizarVincularTelefones(
    clienteAtualId: ClienteUniqKey,
    recebeClienteId: ClienteUniqKey
  ) {
    return api.put(
      `${prefix}/${clienteAtualId}/vincular-telefones/${recebeClienteId}`,
      undefined,
      {
        validateStatus: (s) => s === 200,
      }
    );
  }

  /* Icon */
  static getUrlAvatar(id: ClienteUniqKey, cancelRequest: AbortController) {
    return api.get(`/files/${prefix}/${id}/avatar`, {
      validateStatus: (s) => s === 200,
      signal: cancelRequest.signal,
    });
  }

  static setUrlAvatar(
    id: ClienteUniqKey,
    form: FormData,
    options: AxiosRequestHeaders
  ) {
    return api.post(`/files/${prefix}/${id}/avatar`, form, {
      ...options,
      validateStatus: (s) => s === 201,
    });
  }

  static removeUrlAvatar(id: ClienteUniqKey) {
    return api.delete(`/files/${prefix}/${id}/avatar`, {
      validateStatus: (s) => s === 204,
    });
  }

  /* Relationships */

  /* Processos */
  static async getTodosProcessos(id: ClienteUniqKey) {
    return api
      .get(`${prefix}/${id}/processos`, {
        validateStatus: (s) => s === 200,
      })
      .then((response) => ({
        ...response,
        data: response.data.map((row: any) => ProcessosDao.calculaTudo(row)),
      }));
  }

  /* Oportunidades */
  static async getTodosOportunidades(id: ClienteUniqKey) {
    return api
      .get(`${prefix}/${id}/oportunidades`, {
        validateStatus: (s) => s === 200,
      })
      .then((response) => ({
        ...response,
        data: response.data.map((rowData: any) =>
          OportunidadesDao.calculaTudo(rowData)
        ),
      }));
  }

  /* Documentos */
  static getTodosAnexos(id: ClienteUniqKey) {
    return api.get(`${prefix}/${id}/documentos`, {
      validateStatus: (s) => s === 200,
    });
  }

  /* Galeria */
  static getTodosGaleria(id: ClienteUniqKey) {
    return api.get(`${prefix}/${id}/galerias`, {
      validateStatus: (s) => s === 200,
    });
  }

  /* Anexos Arquivos */
  static getAnexos(id: ClienteUniqKey, anexoId: number) {
    return api.get(`/files/${prefix}/${id}/documentos/${anexoId}`, {
      validateStatus: (s) => s === 200,
    });
  }

  static setAnexos(
    id: ClienteUniqKey,
    documento_tipo_id: number,
    form: FormData,
    options: AxiosRequestHeaders
  ) {
    return api.post(
      `/files/${prefix}/${id}/documentos?documento_tipo_id=${documento_tipo_id}`,
      form,
      {
        ...options,
        validateStatus: (s) => s === 201,
      }
    );
  }

  static delAnexos(id: ClienteUniqKey, anexoId: number) {
    return api.delete(`/files/${prefix}/${id}/documentos/${anexoId}`, {
      validateStatus: (s) => s === 204,
    });
  }

  /* Galeria Arquivos */
  static getGaleria(id: ClienteUniqKey, anexoId: number) {
    return api.get(`/files/${prefix}/${id}/galerias/${anexoId}`, {
      validateStatus: (s) => s === 200,
    });
  }

  static setGaleria(
    id: ClienteUniqKey,
    form: FormData,
    options: AxiosRequestHeaders
  ) {
    return api.post(`/files/${prefix}/${id}/galerias`, form, options);
  }

  static delGaleria(id: ClienteUniqKey, anexoId: number) {
    return api.delete(`/files/${prefix}/${id}/galerias/${anexoId}`, {
      validateStatus: (s) => s === 204,
    });
  }
}

export default ClientesDao;
