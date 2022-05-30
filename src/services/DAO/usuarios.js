import api from '../api'

class UsuariosDao {
  static getPorCpf(cpf) {
    return api.get(`/usuarios/cpf/${cpf}`, {
      validateStatus: (s) => s === 200
    })
  }

  static getPorEmail(email) {
    return api.get(`/usuarios/email/${email}`, {
      validateStatus: (s) => s === 200
    })
  }

  static getTodos() {
    return api.get(`/usuarios`, {
      validateStatus: (s) => s === 200
    })
  }

  static getTodosAtivos() {
    return api.get(`/usuarios`, {
      params: { status_registro: 'A' },
      validateStatus: (s) => s === 200
    })
  }

  static converterPermissoes(nome) {
    const result = this.listaPermissoes()
      .flatMap((row) => row.permissoes)
      .find((permissao) => permissao.nome === nome)
    return result || { nome: 'Desconhecido' }
  }

  static listaPermissoes() {
    return [
      {
        nome: 'Modulos de Sistema',
        permissoes: [
          { titulo: 'Administrador', nome: 'admin', value: false, descricao: 'Tem o acesso geral' },
          {
            titulo: 'Configurações',
            nome: 'configs',
            value: false,
            descricao: 'Tem acesso a aba de Configurações, menos o menu Sistema no menu'
          },
          {
            titulo: 'Financeiro',
            nome: 'financas',
            value: false,
            descricao:
              'Tem acesso a aba de Financeiro no menu e acesso total em lugares financeiros'
          },
          {
            titulo: 'Processos com Alertas (Pagina Inicial)',
            nome: 'processo_alertas',
            value: false,
            descricao: 'Tem acesso a visualizar o bloco de processos com alertas na pagina Inicial'
          },
          {
            titulo: 'Ignorar números por um tempo',
            nome: 'ignorar_numero',
            value: false,
            descricao: 'Pode ignorar numero por 6 meses para evitar registros em API externos'
          }
        ]
      },
      {
        nome: 'Agendamento',
        permissoes: [
          {
            titulo: 'Autorizar/Negar os Agendamento',
            nome: 'agenda_autorizar',
            value: false,
            descricao:
              'Pode Autorizar/Negar Autorizar agendamentos dentro da aba de Agendamentos no menu de contexto'
          }
        ]
      },
      {
        nome: 'Tipos de Evento no Agendamento',
        tipo: 'agenda_tipo_evento',
        permissoes: []
      },
      {
        nome: 'Oportunidade',
        permissoes: [
          {
            titulo: 'Ter acesso Oportunidades',
            nome: 'oportunidade_acesso',
            value: false,
            descricao: 'Pode ter acesso a Oportunidades no menu'
          },
          {
            titulo: 'Tem a todas Oportunidades',
            nome: 'oportunidade_acesso_geral_responsavel',
            value: false,
            descricao: 'Tem acesso a todas Oportunidades mesmo que não seja responsavel dos mesmos'
          },
          {
            titulo: 'Visualizar detalhes de valores de indenizações',
            nome: 'oportunidade_detalhes_indenizacao',
            value: false,
            descricao:
              'Pode ver detalhes de valores de indenizações, tanto na lista quanto na oportunidade'
          },
          {
            titulo: 'Pode alterar status para Efetivar ou Perder',
            nome: 'oportunidade_acoes_status',
            value: false,
            descricao:
              'Pode pedir para Efetivar ou Perda oportunidade. Por padrão será pedido uma aprovação administrativa. Caso não foi habilitado para ignorar confirmação, nas Configurações -> Preferencias'
          },
          {
            titulo: 'Pode retornar o status da oportunidade como pendente',
            nome: 'oportunidade_acoes_retornar_pendente',
            value: false,
            descricao:
              'Pode retonar a os status da oportunidade como pendente, para apuração novamente'
          },
          {
            titulo: 'Pode pedir Arquivamento/Desarquivamento oportunidade',
            nome: 'oportunidade_arquivar',
            value: false,
            descricao: 'Pode pedir o Arquivamento/Desarquivamento oportunidade no menu de ações'
          },
          {
            titulo: 'Mover oportunidade para outro Funil',
            nome: 'oportunidade_mover_funil',
            value: false,
            descricao: 'Pode mover oportunidade para outro funil no menu de ações'
          },
          {
            titulo: 'Vincular telefones à outro cliente',
            nome: 'vincular_telefone_clientes',
            value: false,
            descricao:
              'Permite vincular telefones de uma oportunidade para um cliente já cadastrado e logo após exclui a oportunidade e o cliente atual caso não existir processos para o mesmo'
          },
          {
            titulo: 'Iniciar Processos',
            nome: 'oportunidade_iniciar_processos',
            value: false,
            descricao: 'Pode iniciar processos apartir da oportunidade no menu de ações'
          }
        ]
      },
      {
        nome: 'Tipos de Processos que podem acessar',
        tipo: 'processo_tipo',
        permissoes: []
      },
      {
        nome: 'Processo',
        permissoes: [
          {
            titulo: 'Financeiro',
            nome: 'processo_financas',
            value: false,
            descricao:
              'Tem acesso a aba de Financeiro dentro de processo. Lançamento de registro financeiro'
          },
          {
            titulo: 'Atribuir Marcações',
            nome: 'processo_marcacoes_atribuir',
            value: false,
            descricao: 'Tem poder de Atribuir Marcações, quando não tem nenhuma marcação atribuída'
          },
          {
            titulo: 'Alterar Marcações',
            nome: 'processo_marcacoes_alterar',
            value: false,
            descricao:
              'Tem poder de Alterar Marcações, quando o processo já conter marcações atribuídas'
          },
          {
            titulo: 'Arquivar Processo',
            nome: 'processo_finalizar',
            value: false,
            descricao: 'Tem poder de Arquivar processo com aprovação de administrador'
          },
          {
            titulo: 'Remover Alerta do Processo',
            nome: 'processo_remover_alertas',
            value: false,
            descricao:
              'Tem poder de remover o alerta do processos. Obs.: Qualquer alerta, tanto de estagio e Documentação Completa'
          },
          {
            titulo: 'Excluir Processo',
            nome: 'processo_excluir',
            value: false,
            descricao: 'Tem poder de Excluir processo'
          },
          {
            titulo: 'Alterar Tipo de Processo',
            nome: 'processo_tipo_alterar',
            value: false,
            descricao: 'Tem poder de Alterar o Tipo de Processo'
          },
          {
            titulo: 'Visualizar Valores de Indenizações',
            nome: 'processo_visualizar_valores_indenizacao',
            value: false,
            descricao: 'Tem poder de Visualizar Valores de Indenizações no processo'
          },
          {
            titulo: 'Pode editar o valor da Importância Segurada (Calculo Invalidez)',
            nome: 'processo_importancia_segurada_editar',
            value: false,
            descricao:
              'Tem poder de Ver/Editar o valor Importância Segurada no processo na aba de Calculo Invalidez'
          },
          {
            titulo: 'Acesso a aba Acompanhamento no processo e no menu',
            nome: 'processo_acompanhamento',
            value: false,
            descricao:
              'Tem poder ter acesso para editar/interagir Acompanhamentos no processo e no menu'
          },
          {
            titulo: 'Excluir Acompanhamento',
            nome: 'processo_acompanhamento_excluir',
            value: false,
            descricao: 'Tem poder de Excluir Acompanhamentos de processo'
          },
          {
            titulo: 'Acesso ao item Tarefa de Documento no menu do sistema',
            nome: 'processo_documento_tarefa',
            value: false,
            descricao:
              'Tem poder ter acesso para editar/interagir Tarefas de Documentos no processo (Se se ele tiver premissão de acesso ao tipo de processo) e no menu'
          },
          {
            titulo: 'Excluir Tarefa de Documento',
            nome: 'processo_documento_tarefa_excluir',
            value: false,
            descricao: 'Tem poder de Excluir Tarefas de Documentos de processo'
          },
          {
            titulo: 'Acesso a aba Protocolos no processo e no menu',
            nome: 'processo_protocolo',
            value: false,
            descricao: 'Tem poder ter acesso para editar/interagir Protocolos no processo e no menu'
          }
        ]
      },
      {
        nome: 'Questionário',
        permissoes: [
          {
            titulo: 'Pode criar questionário',
            nome: 'questionario_criar',
            value: false,
            descricao: 'Pode criar questionário'
          },
          {
            titulo: 'Pode alterar questionário',
            nome: 'questionario_alterar',
            value: false,
            descricao: 'Pode alterar questionário'
          },
          {
            titulo: 'Pode excluir questionário',
            nome: 'questionario_excluir',
            value: false,
            descricao: 'Pode excluir questionário ja criados'
          },
          {
            titulo: 'Pode bloquear questionário pra evitar alteração',
            nome: 'questionario_bloquear',
            value: false,
            descricao: 'Pode bloquear questionário pra evitar edição futuras'
          },
          {
            titulo: 'Pode desbloquear questionário para alteração',
            nome: 'questionario_desbloquear',
            value: false,
            descricao: 'Pode desbloquear questionário para alteração'
          }
        ]
      },
      {
        nome: 'Cadastros Especiais',
        permissoes: [
          {
            titulo: 'Visualizar Empregadores e Apólices',
            nome: 'cadastro_especial_empresa_apolice_visualizar',
            value: false,
            descricao:
              'Tem acesso para visualizar a aba de Empregadores e Apólices, no menu Cadastros Especiais'
          },
          {
            titulo: 'Editar/Cadastrar Empregadores e Apólices',
            nome: 'cadastro_especial_empresa_apolice_criar',
            value: false,
            descricao:
              'Tem acesso para criar/editar a aba de Cadastrar Empregadores e Apólices, no menu Cadastros Especiais'
          }
        ]
      },
      {
        nome: 'Relátorios',
        permissoes: [
          {
            titulo: 'Relátorios Geral',
            nome: 'relatorio_geral',
            value: false,
            descricao: 'Tem acesso a aba de Relátorios Geral no menu Relatórios'
          }
        ]
      },
      {
        nome: 'Utilitários',
        permissoes: [
          {
            titulo: 'Unificar Cadastros de Cliente',
            nome: 'utilitario_unificar_cadastros_cliente',
            value: false,
            descricao: 'Tem acesso a aba de Unificar Cadastros de Cliente no menu Utilitários'
          }
        ]
      }
    ]
  }
}

export default UsuariosDao
