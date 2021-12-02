import { Menu, Tag } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
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

export default function Aside({
  collapsed,
  onToogleCollapsed,
  widthMenu,
}: AsideProps) {
  return (
    <LayoutSider
      collapsible
      breakpoint="lg"
      collapsed={collapsed}
      onCollapse={onToogleCollapsed}
      onBreakpoint={onToogleCollapsed}
      width={widthMenu}
    >
      <WrapperBrand>
        <BrandTitle level={3}>{process.env.REACT_APP_NAME}</BrandTitle>
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
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>

        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </LayoutSider>
  );
}
