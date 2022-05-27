import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Grid, Space, Typography } from "antd";
import {
  ArrowLeftOutlined,
  FilterOutlined,
  MenuOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import useQuerieString from "hooks/useQuerieString";

import InputSearchText, { onSearchProp } from "components/InputSearchText";
import DrawerFilter, { DrawerFilteRenderProp } from "components/DrawerFilter";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";

export type PageHeaderProps = {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  acoesMenu?: JSX.Element;
  acoesMenuText?: React.ReactNode;
  loading?: boolean;
  onSave?: () => void;
  saveText?: string;
  saveMode?: "save" | "add";
  showSearch?: boolean;
  showSave?: boolean;
  showBackHistory?: boolean;
  showFilter?: boolean;
  fieldsFilterAvancado?: DrawerFilteRenderProp;
  initialFilterAvancado?: object;
};

export default function PageHeader({
  title,
  subTitle,
  acoesMenu,
  acoesMenuText = "Ações",
  onSave,
  saveText,
  saveMode = "save",
  showSearch = true,
  showSave,
  showBackHistory = true,
  showFilter = true,
  loading,
  fieldsFilterAvancado,
  initialFilterAvancado,
}: PageHeaderProps) {
  const refSearch = useRef<any>(null);
  const responsive = Grid.useBreakpoint();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useQuerieString<any>();

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

  useEffect(() => {
    refSearch.current?.focus();
  }, []);

  return (
    <S.Wrapper>
      <Space align="center">
        {showBackHistory && (
          <Button
            type="text"
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
        )}
        <Space align="baseline">
          <S.Title level={3}>{title}</S.Title>
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
            defaultValue={searchParams?.s || ""}
          />
          {showFilter && fieldsFilterAvancado && (
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
            icon={saveMode === "save" ? <SaveOutlined /> : <PlusOutlined />}
            onClick={onSave}
            loading={loading}
          >
            {saveText || saveMode === "save" ? "Salvar" : "Adicionar"}
          </Button>
        )}
        {acoesMenu && (
          <Dropdown arrow overlay={acoesMenu} trigger={["click"]}>
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
        initialValues={initialFilterAvancado}
        children={fieldsFilterAvancado}
      />
    </S.Wrapper>
  );
}
