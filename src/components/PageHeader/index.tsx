import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Grid, Space, Tooltip, Typography } from "antd";
import {
  ArrowLeftOutlined,
  FilterOutlined,
  MenuOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useQuerieString from "hooks/useQuerieString";

import InputSearchText, { onSearchProp } from "components/InputSearchText";
import DrawerFilter, { DrawerFilteRenderProp } from "components/DrawerFilter";

import * as S from "./styles";

export type PageHeaderProps = {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  acoesMenu?: JSX.Element;
  acoesMenuText?: React.ReactNode;
  onSave?: () => void;
  saveLoading?: boolean;
  saveText?: string;
  saveMode?: "save" | "add";
  showSearch?: boolean;
  showSave?: boolean;
  showBackHistory?: boolean;
  showFilter?: boolean;
  fieldsFilterAvancado?: DrawerFilteRenderProp;
  initialFilterAvancado?: any;
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
  saveLoading,
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
    setSearchParams({ ...searchParams, ...value });
  }

  const handleSearch: onSearchProp = function (value) {
    setSearchParams({ ...searchParams, pesquisa: value });
  };

  function handleResetFiltroAvancado() {
    setSearchParams({ pesquisa: searchParams.pesquisa || "" });
  }

  useEffect(() => {
    if (showSearch) refSearch.current?.focus();
  }, [showSearch]);

  useEffect(() => {
    document.title = `${title}${subTitle ? ` - ${subTitle}` : ""} - GPro`;
  }, [title, subTitle]);

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
          <S.Title level={4}>{title}</S.Title>
          <Typography.Text type="secondary">{subTitle}</Typography.Text>
        </Space>
      </Space>
      {showSearch && (
        <Space>
          <InputSearchText
            size="middle"
            enterButton
            placeholder="Buscar"
            onSearch={handleSearch}
            ref={refSearch}
            style={{ width: !responsive.md ? "150px" : "300px" }}
            defaultValue={searchParams?.pesquisa || ""}
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
          <Tooltip
            title={saveText || saveMode === "save" ? "Salvar" : "Adicionar"}
          >
            <Button
              size="middle"
              type="primary"
              icon={saveMode === "save" ? <SaveOutlined /> : <PlusOutlined />}
              onClick={onSave}
              loading={saveLoading}
            />
          </Tooltip>
        )}
        {acoesMenu && (
          <Dropdown arrow overlay={acoesMenu} trigger={["click"]}>
            <Button
              size="middle"
              type="ghost"
              icon={<MenuOutlined />}
              title="Mais Ações"
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
        onReset={handleResetFiltroAvancado}
        initialValues={initialFilterAvancado}
        children={fieldsFilterAvancado}
      />
    </S.Wrapper>
  );
}
