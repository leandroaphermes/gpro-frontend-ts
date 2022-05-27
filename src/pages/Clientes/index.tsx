import {
  Card,
  Col,
  Input,
  Form,
  FormInstance,
  Menu,
  Table,
  TableColumnsType,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useMemo } from "react";

import BaseTemplate from "components/TemplatePage";
import { mockData } from "./mock";
import { useNavigate } from "react-router-dom";

export default function Clientes() {
  const initialFilterAvancado = useMemo(() => ({}), []);

  const navigate = useNavigate();

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

  const colunas: TableColumnsType<typeof mockData[0]> = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Mail",
      dataIndex: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
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
        onSave: console.log,
        showSave: true,
        saveMode: "add",
        acoesMenu: menu,
      }}
    >
      <Card>
        <Table
          dataSource={mockData}
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
