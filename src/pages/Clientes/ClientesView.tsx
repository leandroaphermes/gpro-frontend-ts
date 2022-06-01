import { useEffect, useState } from "react";
import {
  AppstoreAddOutlined,
  AuditOutlined,
  ContainerOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Menu, Form, Tabs } from "antd";
import type { ClienteFormType, ClienteType } from "types/cliente";

import useCliente, { ClienteProvider } from "hooks/useCliente";

import BaseTemplate from "components/TemplatePage";
import ClienteBarInfoBasico from "components/ClienteBarInfoBasico";
import CardLoading from "components/CardLoading";

import Formulario from "./Formulario";
import moment from "moment";

export default function ClientesView() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { cliente, load, loading, salvar } = useCliente();
  const [loadingButton, setLoadingButton] = useState(false);

  function handleSubmit(values: ClienteFormType) {
    setLoadingButton(true);
    salvar(values).finally(() => {
      setLoadingButton(false);
    });
  }

  useEffect(() => {
    if (id) {
      load(parseInt(id))
        .then((data: ClienteType) => {
          form.setFieldsValue({
            ...data,
            nascimento_data: data.nascimento_data
              ? moment(data.nascimento_data)
              : null,
          });
        })
        .catch(() => navigate("/erros/404"));
    }
  }, [load, id, navigate, form]);

  if (loading) return <CardLoading />;
  if (cliente === null) {
    return null;
  }

  const tabsList = [
    {
      key: "dados-cadastrais",
      tab: {
        icon: <UserOutlined />,
        label: "Dados Cadastro",
      },
      children: <Formulario form={form} onChangeFinish={handleSubmit} />,
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

  console.log(id);
  return (
    <ClienteProvider>
      <BaseTemplate
        container="central"
        headerProps={{
          title: cliente.nome,
          subTitle: "Cliente",
          onSave: () => form.submit(),
          saveLoading: loadingButton,
          showSave: true,
          showSearch: false,
          acoesMenu: menu,
        }}
      >
        <ClienteBarInfoBasico cliente={cliente} />
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
    </ClienteProvider>
  );
}
