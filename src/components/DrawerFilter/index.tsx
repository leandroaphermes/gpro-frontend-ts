import React, { useState } from "react";
import { Button, Drawer, Space, Form, Row } from "antd";

export type DrawerFilterProps = {
  visible: boolean;
  children: React.ReactNode;
  title?: React.ReactNode;
  onClose: () => void;
  onOk: (values: any) => Promise<void>;
};

export default function DrawerFilter({
  children,
  visible,
  title = "Filtros Avançado",
  onClose,
  onOk,
}: DrawerFilterProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  function handleOk() {
    form.validateFields().then((values) => {
      setLoading(true);
      onOk(values).finally(() => {
        setLoading(false);
      });
    });
  }

  return (
    <Drawer
      visible={visible}
      title={title}
      width={400}
      closable={false}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={handleOk} loading={loading}>
            Pesquisar
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          {typeof children === "function" ? children(form) : children}
        </Row>
      </Form>
    </Drawer>
  );
}
