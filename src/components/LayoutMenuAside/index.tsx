import { useEffect, useMemo, useState } from "react";
import { Grid, Menu, Tag } from "antd";
import { Link, matchPath, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import _ from "lodash";

import * as S from "./styles";

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

export type RouteListProp = {
  href: string;
  permissions: [];
  label: string | React.ReactNode;
  icon?: React.ReactNode;
};

const routerList: RouteListProp[] = [
  {
    href: "/",
    label: "Inicio",
    icon: <HomeOutlined />,
    permissions: [],
  },
  {
    href: "/clientes",
    label: "Clientes",
    icon: <UserOutlined />,
    permissions: [],
  },
  {
    href: "/ligacoes",
    label: "Ligações",
    icon: <PhoneOutlined />,
    permissions: [],
  },
  {
    href: "/logout",
    label: "Sair",
    icon: <LogoutOutlined />,
    permissions: [],
  },
];

export default function Aside({
  collapsed,
  onToogleCollapsed,
  widthMenu,
}: AsideProps) {
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const responsive = Grid.useBreakpoint();

  const location = useLocation();

  const defaultSelected = useMemo(
    () =>
      routerList
        .map((item) => {
          const match = matchPath(item.href, location.pathname);
          return { href: item.href, status: !!match };
        })
        .find((row) => row.status),
    [location.pathname]
  );

  useEffect(() => {
    setSelectKeys([defaultSelected?.href || "/"]);
  }, [defaultSelected]);

  return (
    <S.LayoutSider
      collapsible
      breakpoint="xxl"
      collapsed={collapsed}
      onCollapse={onToogleCollapsed}
      onBreakpoint={onToogleCollapsed}
      collapsedWidth={responsive.md ? 80 : 0}
      width={widthMenu}
    >
      <S.WrapperBrand>
        <S.BrandTitle level={4}>{process.env.REACT_APP_NAME}</S.BrandTitle>
        {!collapsed && (
          <S.BrandSubTitle>{process.env.REACT_APP_SUBNAME}</S.BrandSubTitle>
        )}
        <S.ContainerVersao>
          <S.TextVersao>{process.env.REACT_APP_VERSION}</S.TextVersao>{" "}
          <S.TextVersao>
            {_.upperFirst(empresa?.versao_contratado)}
          </S.TextVersao>
        </S.ContainerVersao>
        {!collapsed && (
          <div>
            <S.LinkSuporte
              href="https://app.pipefy.com/public/form/5UPXYXx3"
              target="_blank"
              rel="noreferrer"
            >
              Ajuda e Suporte
            </S.LinkSuporte>
          </div>
        )}
        <S.ContainerUsuario>
          <S.ContainerUsuarioText>
            {String(usuario?.nome || "").split(" ")?.[0] || ""} (
            {String(empresa.nome).trim()})
          </S.ContainerUsuarioText>
        </S.ContainerUsuario>
        {empresa?.status_contratado === "vencido" && !collapsed && (
          <Tag color="warning">Existem mensalidade(s) vencidas!</Tag>
        )}
      </S.WrapperBrand>

      <Menu
        theme="dark"
        selectedKeys={selectKeys}
        mode="inline"
        items={routerList.map((item) => ({
          ...item,
          key: item.href,
          label: <Link to={item.href}>{item.label}</Link>,
        }))}
      />
    </S.LayoutSider>
  );
}
