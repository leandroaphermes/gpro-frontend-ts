import { Card, Col, Input, Form, FormInstance } from "antd";
import { useMemo } from "react";

import BaseTemplate from "components/TemplatePage";

export default function Clientes() {
  const initialFilterAvancado = useMemo(() => ({}), []);

  const fieldsForm = (form: FormInstance) => {
    return (
      <>
        <Col xs={24}>
          <Form.Item label="Filtro 1" name="name_1">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Filtro 2" name="name_2">
            <Input />
          </Form.Item>
        </Col>
      </>
    );
  };

  return (
    <BaseTemplate
      container="central"
      pageHeader={{
        title: "Clientes",
        showFilter: true,
        fieldsFilterAvancado: fieldsForm,
        initialFilterAvancado,
      }}
    >
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
    </BaseTemplate>
  );
}
