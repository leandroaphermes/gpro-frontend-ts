import type { Moment } from "moment";

import type { CampoPersonalizadoValueType } from "./campo_personalizado";
import type { EnderecoType } from "./endereco";
import type { MarcadorType } from "./marcador";
import type { TelefonesType } from "./telefones";

export type ClienteFiltroListaQueryType = {
  coluna?: string;
  pesquisa?: string | number;
  incluir_impossibilitados?: "true" | "false";
  created_at?: [string, string];
};

export type ClienteTipoRegistro = "lead" | "cliente";

export type ClienteType = {
  id: number;
  nome: string;
  email: string | null;
  cpf: number | null;
  rg: string | null;
  sexo: string;
  foto: boolean;
  nascimento_data: string | null;
  telefones: TelefonesType;
  marcadores: MarcadorType[] & {
    privot: {
      marcador_id: MarcadorType["id"];
      cliente_id: ClienteType["id"];
    };
  };
  enderecos: EnderecoType[];
  observacao: string | null;
  captador_tipo_id: number | null;
  captador_tipo_valor: string | null;
  captador_local_id: number | null;
  tipo_registro: ClienteTipoRegistro;
  profissao: string | null;
  campos_personalizados?: CampoPersonalizadoValueType;
};

export type ClienteRequestType = Omit<ClienteType, "marcadores" | "id"> & {
  id?: number;
};

export type ClienteFormType = Omit<ClienteRequestType, "nascimento_data"> & {
  nascimento_data: Moment | null;
};

export type ClienteUniqKey = ClienteType["id"];
