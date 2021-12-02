import { Button, Dropdown, Input, Space, Typography } from "antd";
import {
  ArrowLeftOutlined,
  MenuOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import InputSearchText, { onSearchProp } from "components/InputSearchText";

import { Wrapper, Title } from "./styles";
import { useEffect, useRef } from "react";

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
  loading,
}: PageHeaderProps) {
  const refSearch = useRef<Input>(null);

  const handleSearch: onSearchProp = function (value, event) {
    console.log(value, event);
  };

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
        <InputSearchText
          size="middle"
          enterButton
          placeholder="Buscar"
          loading={loading}
          onSearch={handleSearch}
          ref={refSearch}
        />
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
    </Wrapper>
  );
}
