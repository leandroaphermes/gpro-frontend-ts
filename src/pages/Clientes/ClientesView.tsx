import { useState } from "react";
import {
  AppstoreAddOutlined,
  AuditOutlined,
  ContainerOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  TagOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  Card,
  Menu,
  Form,
  message,
  Row,
  Col,
  Typography,
  Space,
  Tabs,
} from "antd";

import BaseTemplate from "components/TemplatePage";
import Formulario from "./Formulario";

const data = {
  name: "loremss",
  phone: "231412-512512",
  age: 25,
  email: "afasfasfasfas",
  address: "agasgahwoor wroakp kasa slça",
  registered: new Date().toISOString(),
};

export default function ClientesView() {
  const { id } = useParams();
  const [form] = Form.useForm();

  const [loadingButton, setLoadingButton] = useState(false);

  console.log(id);

  const tabsList = [
    {
      key: "dados-cadastrais",
      tab: {
        icon: <UserOutlined />,
        label: "Dados Cadastro",
      },
      children: <Formulario form={form} />,
      forceRender: true,
      visible: true,
    },
    {
      key: "ligacoes",
      tab: {
        icon: <PhoneOutlined />,
        label: "Ligações",
      },
      children:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum, dolor voluptatibus numquam saepe quae veritatis in ratione id omnis provident vitae eius! Dolores et accusamus ab, sint ratione temporibus?",
      forceRender: false,
      visible: true,
    },
    {
      key: "oportunidades",
      tab: {
        icon: <AuditOutlined />,
        label: "Oportunidades",
      },
      children:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum, dolor voluptatibus numquam saepe quae veritatis in ratione id omnis provident vitae eius! Dolores et accusamus ab, sint ratione temporibus?",
      forceRender: false,
      visible: true,
    },
    {
      key: "processos",
      tab: {
        icon: <ContainerOutlined />,
        label: "Processos",
      },
      children:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum, dolor voluptatibus numquam saepe quae veritatis in ratione id omnis provident vitae eius! Dolores et accusamus ab, sint ratione temporibus?",
      forceRender: false,
      visible: true,
    },
    {
      key: "anexos",
      tab: {
        icon: <FileOutlined />,
        label: "Anexos",
      },
      children:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum, dolor voluptatibus numquam saepe quae veritatis in ratione id omnis provident vitae eius! Dolores et accusamus ab, sint ratione temporibus?",
      forceRender: false,
      visible: true,
    },
    {
      key: "galeria",
      tab: {
        icon: <FileImageOutlined />,
        label: "Galeria",
      },
      children:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum, dolor voluptatibus numquam saepe quae veritatis in ratione id omnis provident vitae eius! Dolores et accusamus ab, sint ratione temporibus?",
      forceRender: false,
      visible: true,
    },
    {
      key: "questionarios",
      tab: {
        icon: <AppstoreAddOutlined />,
        label: "Questionários",
      },
      children:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum, dolor voluptatibus numquam saepe quae veritatis in ratione id omnis provident vitae eius! Dolores et accusamus ab, sint ratione temporibus?",
      forceRender: false,
      visible: true,
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          key: "info",
          label: "Informações",
          icon: <InfoCircleOutlined />,
        },
        {
          key: "impossibilitar",
          label: "Impossiblitar Cliente",
          icon: <WarningOutlined />,
        },
        {
          type: "divider",
        },
        {
          key: "excluir",
          label: "Excluir",
          danger: true,
          icon: <DeleteOutlined />,
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
        <Row justify="space-between">
          <Col>
            <Space>
              <Typography.Text type="secondary">
                Cliente ID: 222222
              </Typography.Text>
              <Typography.Text copyable>Nome: fas fasf asfa</Typography.Text>
            </Space>
          </Col>
          <Col>
            <TagOutlined />
          </Col>
        </Row>
      </Card>
      <Card>
        <Tabs>
          {tabsList
            .filter((tabItem) => tabItem.visible)
            .map((tabItem) => (
              <Tabs.TabPane
                key={tabItem.key}
                tab={
                  <span>
                    {tabItem.tab.icon}
                    {tabItem.tab.label}
                  </span>
                }
                forceRender={tabItem.forceRender}
              >
                {tabItem.children}
              </Tabs.TabPane>
            ))}
        </Tabs>
      </Card>
    </BaseTemplate>
  );
}
