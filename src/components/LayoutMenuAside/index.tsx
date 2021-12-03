import { Menu, Tag } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";

import {
  BrandSubTitle,
  BrandTitle,
  ContainerUsuario,
  ContainerUsuarioText,
  ContainerVersao,
  LayoutSider,
  LinkSuporte,
  TextVersao,
  WrapperBrand,
} from "./styles";

export type AsideProps = {
  collapsed: boolean;
  onToogleCollapsed: (collapse: boolean) => void;
  widthMenu: number;
};

const { empresa, usuario } = {
  empresa: {
    nome: "Empresa Teste",
    versao_contratado: "premium",
    status_contratado: "normal",
  },
  usuario: {
    id: 21,
    nome: "Leandro",
  },
};

const routerList = [
  {
    key: "home",
    href: "/",
    title: "Inicio",
    icon: <HomeOutlined />,
    permissions: [],
  },
  {
    key: "clientes",
    href: "/clientes",
    title: "Clientes",
    icon: <UserOutlined />,
    permissions: [],
  },
  {
    key: "ligacoes",
    href: "/ligacoes",
    title: "Ligações",
    icon: <PhoneOutlined />,
    permissions: [],
  },
  {
    key: "logout",
    href: "/logout",
    title: "Sair",
    icon: <LogoutOutlined />,
    permissions: [],
  },
];

export default function Aside({
  collapsed,
  onToogleCollapsed,
  widthMenu,
}: AsideProps) {
  return (
    <LayoutSider
      collapsible
      breakpoint="xl"
      collapsed={collapsed}
      onCollapse={onToogleCollapsed}
      onBreakpoint={onToogleCollapsed}
      width={widthMenu}
    >
      <WrapperBrand>
        <BrandTitle level={4}>{process.env.REACT_APP_NAME}</BrandTitle>
        {!collapsed && (
          <BrandSubTitle>{process.env.REACT_APP_SUBNAME}</BrandSubTitle>
        )}
        <ContainerVersao>
          <TextVersao>{process.env.REACT_APP_VERSION}</TextVersao>{" "}
          <TextVersao>{_.upperFirst(empresa?.versao_contratado)}</TextVersao>
        </ContainerVersao>
        {!collapsed && (
          <div>
            <LinkSuporte
              href="https://app.pipefy.com/public/form/5UPXYXx3"
              target="_blank"
              rel="noreferrer"
            >
              Ajuda e Suporte
            </LinkSuporte>
          </div>
        )}
        <ContainerUsuario>
          <ContainerUsuarioText>
            {String(usuario?.nome || "").split(" ")?.[0] || ""} (
            {String(empresa.nome).trim()})
          </ContainerUsuarioText>
        </ContainerUsuario>
        {empresa?.status_contratado === "vencido" && !collapsed && (
          <Tag color="warning">Existem mensalidade(s) vencidas!</Tag>
        )}
      </WrapperBrand>

      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {routerList.map((item) => {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.href}>{item.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </LayoutSider>
  );
}
