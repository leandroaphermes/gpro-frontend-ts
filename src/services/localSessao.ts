export enum StatusRegistro {
  ATIVO = "A",
  INATIVO = "I",
  DELETADO = "D",
}
export enum VersaoContratado {
  STANDARD = "standard",
  PREMIUM = "premium",
}
export enum StatusContratado {
  NORMAL = "normal",
  VENCIDA = "vencido",
  BLOQUEADO = "bloqueado",
}

export type SessaoEmpresaType = {
  id: number;
  nome: string;
  parametros_padrao: {
    [key: string]: any;
  };
  pivot: {
    created_at: string;
    dono: boolean;
    empresa_id: number;
    permissoes: {
      [key: string]: boolean;
    };
    preferencias: null;
    status_registro: StatusRegistro;
    updated_at: string;
    usuario_id: number;
  };
  status_contratado: StatusContratado;
  versao_contratado: VersaoContratado;
};

export type SessaoUsuarioType = {
  id: number;
  nome: string;
  cpf?: number;
  refreshToken: string | null;
  token: string;
  empresas: SessaoEmpresaType[];
};

export function getSessaoUsuario() {
  const usuario = localStorage.getItem("sessao_usuario") || "";
  let usuario_parse: SessaoUsuarioType | null = null;
  try {
    usuario_parse = JSON.parse(usuario);
  } catch (error) {
    localStorage.clear();
  }
  return usuario_parse;
}
export function setSessaoUsuario(usuario: SessaoUsuarioType) {
  localStorage.setItem("sessao_usuario", JSON.stringify(usuario));
}
export function deleteSessaoUsuario() {
  localStorage.removeItem("sessao_usuario");
}

export function getSessaoEmpresa() {
  const empresa: string | null =
    sessionStorage.getItem("sessao_empresa") ||
    localStorage.getItem("sessao_empresa");
  let empresa_parse: SessaoEmpresaType | null = null;
  try {
    empresa_parse = JSON.parse(empresa || "");
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
  }
  return empresa_parse;
}
export function setSessaoEmpresa(empresa: SessaoEmpresaType) {
  localStorage.setItem("sessao_empresa", JSON.stringify(empresa));
  sessionStorage.setItem("sessao_empresa", JSON.stringify(empresa));
}
export function deleteSessaoEmpresa() {
  localStorage.removeItem("sessao_empresa");
}
