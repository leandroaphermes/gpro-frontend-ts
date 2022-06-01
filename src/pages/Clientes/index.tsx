import { useEffect, useMemo } from "react";
import {
  Card,
  Col,
  Form,
  FormInstance,
  Table,
  TableColumnsType,
  message,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import type { ClienteFiltroListaQueryType, ClienteType } from "types/cliente";
import ClientesDao from "services/DAO/clientes";

import useRequest from "hooks/useRequest";
import useQuerieString from "hooks/useQuerieString";

import BaseTemplate from "components/TemplatePage";
import CardLoading from "components/CardLoading";

export default function Clientes() {
  const [queries] = useQuerieString<ClienteFiltroListaQueryType>({
    coluna: "todos",
    incluir_impossibilitados: "false",
  });

  const navigate = useNavigate();
  const [resultados, loading, load] = useRequest<ClienteType[]>(
    ClientesDao.getBuscar,
    { ignoreInitLoaded: true }
  );

  const initialFilterAvancado = useMemo(
    () => ({
      ...queries,
      created_at:
        Array.isArray(queries.created_at) && queries.created_at.length === 2
          ? [moment(queries.created_at[0]), moment(queries.created_at[1])]
          : null,
      incluir_impossibilitados: queries.incluir_impossibilitados === "true",
    }),
    [queries]
  );

  const fieldsForm = (form: FormInstance, focusFirstField: any) => {
    return (
      <>
        <Col xs={24}>
          <Form.Item label="Campo Pesquisa" name="coluna">
            <Select
              ref={focusFirstField}
              options={[
                { label: "Todos", value: "todos" },
                { label: "Nome", value: "nome" },
                { label: "Telefone", value: "telefone" },
                { label: "CPF", value: "cpf" },
                { label: "ID", value: "id" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Criado em" name="created_at">
            <DatePicker.RangePicker allowClear format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="incluir_impossibilitados" valuePropName="checked">
            <Checkbox>Incluir Impossibilitados</Checkbox>
          </Form.Item>
        </Col>
      </>
    );
  };

  const colunas: TableColumnsType<ClienteType> = [
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "Data Nascimento",
      dataIndex: "nascimento_data",
    },
    {
      title: "cpf",
      dataIndex: "cpf",
    },
    {
      title: "RG",
      dataIndex: "rg",
      align: "right",
    },
  ];

  useEffect(() => {
    if (queries.pesquisa) {
      load({
        ...queries,
        created_at: queries?.created_at?.[0]
          ? [
              moment(queries.created_at[0]).format(moment.HTML5_FMT.DATE),
              moment(queries.created_at[1]).format(moment.HTML5_FMT.DATE),
            ]
          : null,
        incluir_impossibilitados: queries.incluir_impossibilitados === "true",
      });
    }
  }, [load, queries]);

  return (
    <BaseTemplate
      container="central"
      headerProps={{
        title: "Clientes",
        showFilter: true,
        fieldsFilterAvancado: fieldsForm,
        initialFilterAvancado,
        onSave: () => message.info("Modal criar cliente"),
        showSave: true,
        saveMode: "add",
      }}
    >
      {loading ? (
        <CardLoading />
      ) : (
        <Card>
          <Table
            dataSource={resultados || []}
            columns={colunas}
            rowKey="id"
            onRow={(rowData) => ({
              onClick: (event) => navigate(`/clientes/${rowData.id}`),
            })}
          />
          {/*           <TabelaDevExtreme
            dataSource={resultados || []}
            columns={colunas}
            rowKey="id"
            onRowClick={({ data }) => navigate(`/clientes/${data.id}`)}
          /> */}
        </Card>
      )}
    </BaseTemplate>
  );
}
