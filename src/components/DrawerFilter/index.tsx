import React, { useState } from "react";
import { Button, Drawer, Space, Form, Row, FormInstance } from "antd";

export type DrawerFilteRenderProp = (form: FormInstance) => JSX.Element;

export type DrawerFilterProps<T> = {
  visible: boolean;
  children?: DrawerFilteRenderProp;
  title?: React.ReactNode;
  onClose: () => void;
  onOk: (values: any) => Promise<void>;
  initialValues?: T;
};

export default function DrawerFilter<T>({
  children,
  visible,
  title = "Filtros Avançado",
  onClose,
  onOk,
  initialValues,
}: DrawerFilterProps<T>) {
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
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <Row gutter={[8, 8]}>{children && children(form)}</Row>
      </Form>
    </Drawer>
  );
}
