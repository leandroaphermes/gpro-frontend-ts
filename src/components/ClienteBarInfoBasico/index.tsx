import React from "react";
import { Card, Col, Row, Space, Typography } from "antd";
import { ClienteType } from "types/cliente";

import Marcadores from "components/Marcadores";
import TextoCapitalizado from "components/Uteis/TextoCapitalize";

export type ClienteBarInfoBasicoProps = {
  cliente: ClienteType;
};

export default function ClienteBarInfoBasico({
  cliente,
}: ClienteBarInfoBasicoProps) {
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <Typography.Text type="secondary">
              <TextoCapitalizado>{cliente.tipo_registro}</TextoCapitalizado> ID:{" "}
              {cliente.id}
            </Typography.Text>
            <Typography.Text copyable={{ text: String(cliente.nome).trim() }}>
              Nome: {cliente.nome}
            </Typography.Text>
          </Space>
        </Col>
        <Col>
          <Marcadores
            dataSource={cliente.marcadores}
            onChange={async (v) => console.log(v)}
          />
        </Col>
      </Row>
    </Card>
  );
}
