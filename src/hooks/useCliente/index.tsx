import React, { createContext, useCallback, useState } from "react";
import { message } from "antd";
import axios, { AxiosError } from "axios";

import type { ResponseErrorDataApi } from "hooks/useRequest";
import type {
  ClienteFormType,
  ClienteType,
  ClienteUniqKey,
} from "types/cliente";
import ClientesDao from "services/DAO/clientes";

export const initClienteValue = {};

export const ClienteContext = createContext(initClienteValue);

export type ClienteProviderProps = {
  children: React.ReactNode;
};

function useCliente() {
  const [cliente, setCliente] = useState<ClienteType | null>(null);
  const [loading, setLoading] = useState(false);

  const salvar = useCallback(
    async (values: Partial<ClienteFormType>) => {
      return ClientesDao.salvar({ id: cliente?.id, ...values })
        .then((response) => {
          setCliente({
            ...cliente,
            ...response.data,
          });

          message.success("Salvo com sucesso");
          return response.data;
        })
        .catch((errInstancie: Error | AxiosError<ResponseErrorDataApi>) => {
          if (axios.isAxiosError(errInstancie)) {
            // Access to config, request, and response
            if (
              errInstancie.response?.status === 422 &&
              Array.isArray(errInstancie.response.data) &&
              errInstancie.response.data.find(
                (row) => String(row.field).search("enderecos") !== -1
              )
            ) {
              message.error(
                <span>
                  Erro ao salvar cliente. Verifique os dados dos{" "}
                  <strong>Endereços</strong>
                </span>,
                5
              );
            } else if (
              errInstancie.response?.status === 422 &&
              Array.isArray(errInstancie.response.data) &&
              errInstancie.response.data.find(
                (row) => String(row.field).search("telefones") !== -1
              )
            ) {
              message.error(
                <span>
                  Erro ao salvar cliente. Verifique os dados dos{" "}
                  <strong>Telefones</strong>
                </span>,
                5
              );
            } else if (
              errInstancie.response?.status === 422 &&
              Array.isArray(errInstancie.response.data) &&
              errInstancie.response.data.find(
                (row) => String(row.field).search("nascimento_data") !== -1
              )
            ) {
              message.error(
                <span>
                  Erro ao salvar cliente. Verifique os dados do campo de{" "}
                  <strong>Data de Nascimento</strong>
                </span>,
                5
              );
            } else if (errInstancie.response?.status === 422) {
              message.error(
                "Erro ao salvar cliente. Verifique os campos do formulario",
                5
              );
            } else if (errInstancie.response?.status === 409) {
              message.error(errInstancie.response?.data?.message);
            } else {
              message.error("Não foi possivel fazer esta ação");
            }
          } else {
            // Just a stock error
            message.error("Erro interno. Notifique o suporte do GPro");
          }
          return errInstancie;
        });
    },
    [cliente]
  );

  const load = useCallback(async (id: ClienteUniqKey) => {
    setLoading(true);
    return ClientesDao.getPorID<ClienteType>(id)
      .then((response) => {
        setCliente(response.data);
        setLoading(false);
        return response.data;
      })
      .catch((err) => {
        message.error("Cliente não encontrado");
        setLoading(false);
        return err;
      });
  }, []);

  return {
    cliente,
    loading,
    load,
    salvar,
  };
}

export const ClienteProvider = ({ children }: ClienteProviderProps) => {
  const cliente = useCliente();

  return (
    <ClienteContext.Provider value={cliente}>
      {children}
    </ClienteContext.Provider>
  );
};

export default useCliente;
