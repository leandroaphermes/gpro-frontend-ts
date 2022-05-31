import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Space, Form, Row, FormInstance } from "antd";

export type DrawerFilteRenderProp = (
  form: FormInstance,
  focusFirstField: React.RefObject<HTMLInputElement>
) => JSX.Element;

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
  const focusFirstField = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  function handleSubmit(values: T) {
    setLoading(true);
    onOk(values).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    if (visible) {
      console.log(focusFirstField);
      focusFirstField.current?.focus();
    }
  }, [visible, focusFirstField]);

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
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            Pesquisar
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Row gutter={[8, 8]}>{children && children(form, focusFirstField)}</Row>
      </Form>
    </Drawer>
  );
}
