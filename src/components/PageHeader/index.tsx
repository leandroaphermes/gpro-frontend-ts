import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Grid, Input, Space, Typography } from "antd";
import {
  ArrowLeftOutlined,
  FilterOutlined,
  MenuOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import InputSearchText, { onSearchProp } from "components/InputSearchText";

import { Wrapper, Title } from "./styles";
import DrawerFilter from "components/DrawerFilter";
import useQuerieString from "hooks/useQuerieString";

export type PageHeaderProps = {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  acoesMenu?: React.ReactElement;
  acoesMenuText?: React.ReactNode;
  loading?: boolean;
  onSave?: () => void;
  showSearch?: boolean;
  showSave?: boolean;
  showBackHistory?: boolean;
  showFilter?: boolean;
  fieldsfilterAvancado?: React.ReactNode;
};

type SearchUrlProps = {
  s?: string;
};

export default function PageHeader({
  title,
  subTitle,
  acoesMenu,
  acoesMenuText = "Ações",
  onSave,
  showSearch = true,
  showSave,
  showBackHistory = true,
  showFilter = true,
  loading,
  fieldsfilterAvancado,
}: PageHeaderProps) {
  const refSearch = useRef<Input>(null);
  const responsive = Grid.useBreakpoint();

  const [searchParams, setSearchParams] = useQuerieString<SearchUrlProps>();

  const [controleModalFiltroAvancado, setControleModalFiltroAvancado] =
    useState(false);

  async function handleSearchAvancado(value: any) {
    /* console.log(value, event); */
    console.log(value);
    setSearchParams({ ...searchParams, ...value });
  }

  const handleSearch: onSearchProp = function (value, event) {
    /* console.log(value, event); */
    setSearchParams({ ...searchParams, s: value });
  };

  console.log(searchParams);

  useEffect(() => {
    refSearch.current?.focus();
  }, []);

  return (
    <Wrapper>
      <Space align="center">
        {showBackHistory && (
          <Button type="text" size="large" icon={<ArrowLeftOutlined />} />
        )}
        <Space align="baseline">
          <Title level={3}>{title}</Title>
          <Typography.Text type="secondary">{subTitle}</Typography.Text>
        </Space>
      </Space>
      {showSearch && (
        <Space>
          <InputSearchText
            size="middle"
            enterButton
            placeholder="Buscar"
            loading={loading}
            onSearch={handleSearch}
            ref={refSearch}
            style={{ width: !responsive.md ? "150px" : "300px" }}
            defaultValue={searchParams.s || ""}
          />
          {showFilter && fieldsfilterAvancado && (
            <Button
              type="text"
              size="middle"
              icon={<FilterOutlined />}
              title="Filtro Avançado"
              onClick={() => setControleModalFiltroAvancado(true)}
            />
          )}
        </Space>
      )}
      <Space>
        {showSave && (
          <Button
            size="middle"
            type="primary"
            icon={<SaveOutlined />}
            onClick={onSave}
            loading={loading}
          >
            Salvar
          </Button>
        )}
        {acoesMenu && (
          <Dropdown overlay={acoesMenu} trigger={["click"]}>
            <Button
              size="middle"
              type="ghost"
              icon={<MenuOutlined />}
              aria-label="Mais Ações"
            >
              {acoesMenuText}
            </Button>
          </Dropdown>
        )}
      </Space>
      <DrawerFilter
        visible={controleModalFiltroAvancado}
        onClose={() => setControleModalFiltroAvancado(false)}
        onOk={handleSearchAvancado}
      >
        {fieldsfilterAvancado}
      </DrawerFilter>
    </Wrapper>
  );
}
