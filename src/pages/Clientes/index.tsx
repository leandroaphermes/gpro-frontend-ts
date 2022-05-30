import { useMemo } from "react";
import {
  Card,
  Col,
  Input,
  Form,
  FormInstance,
  Menu,
  Table,
  TableColumnsType,
  message,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import BaseTemplate from "components/TemplatePage";
import useRequest from "hooks/useRequest";
import ClientesDao from "services/DAO/clientes";

export type RecordCliente = {
  id: number;
  nome: string;
  nascimento_data?: string;
  cpf?: number;
  rg: string;
  telefones: [{ num: number; obs: string }] | null;
};

export default function Clientes() {
  const initialFilterAvancado = useMemo(() => ({}), []);

  const navigate = useNavigate();
  const [resultados, loading] = useRequest(ClientesDao.getBuscar);

  const fieldsForm = (form: FormInstance) => {
    return (
      <>
        <Col xs={24}>
          <Form.Item label="Filtro 1" name="name_1">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Filtro 2" name="name_2">
            <Input />
          </Form.Item>
        </Col>
      </>
    );
  };

  const menu = (
    <Menu
      items={[
        {
          key: "info",
          label: "Informações",
          icon: <InfoCircleOutlined />,
        },
      ]}
    />
  );

  const colunas: TableColumnsType<RecordCliente> = [
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
        acoesMenu: menu,
      }}
    >
      <Card>
        <Table
          dataSource={resultados}
          columns={colunas}
          rowKey="_id"
          onRow={(rowData) => ({
            onClick: (event) => navigate(`/clientes/${rowData._id}`),
          })}
        />
      </Card>
    </BaseTemplate>
  );
}
