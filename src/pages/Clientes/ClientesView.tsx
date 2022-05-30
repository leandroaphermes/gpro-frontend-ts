import {
  Card,
  Descriptions,
  Menu,
  Form,
  message,
  Input,
  Row,
  Col,
  DatePicker,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import BaseTemplate from "components/TemplatePage";

import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ClientesView() {
  const { id } = useParams();
  const [form] = Form.useForm();

  const [loadingButton, setLoadingButton] = useState(false);

  console.log(id);

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

  function handleSubmit(values: any) {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      message.success("Salvo com sucesso");
    }, 5000);
  }

  return (
    <BaseTemplate
      container="central"
      headerProps={{
        title: `Cliente: ${data?.name}`,
        onSave: () => form.submit(),
        saveLoading: loadingButton,
        showSave: true,
        showSearch: false,
        acoesMenu: menu,
      }}
    >
      <Card>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Telefones">{data?.phone}</Descriptions.Item>
          <Descriptions.Item label="Data Nasci.">{data?.age}</Descriptions.Item>
          <Descriptions.Item label="Criado em">
            {new Date(data?.registered || "").toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
          <Descriptions.Item label="Endereço">
            {data?.address}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={[5, 5]}>
            <Col xs={24} lg={8}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, min: 2, max: 100 }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item name="nascimento_data" label="Data Nascimento">
                <DatePicker allowClear format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
    </BaseTemplate>
  );
}
