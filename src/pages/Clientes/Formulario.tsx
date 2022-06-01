import { Col, Form, Input, Row, FormInstance, DatePicker, Select } from "antd";

export type FormularioProps = {
  form: FormInstance;
  onChangeFinish: (values: any) => void;
};

export default function Formulario({ form, onChangeFinish }: FormularioProps) {
  return (
    <Form form={form} layout="vertical" onFinish={onChangeFinish}>
      <Row gutter={[5, 5]}>
        <Col xs={24} lg={12}>
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true }, { min: 2 }, { max: 100 }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item name="cpf" label="CPF">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item name="rg" label="RG">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item name="nascimento_data" label="Data Nascimento">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item name="sexo" label="Sexo">
            <Select
              options={[
                { label: "Masculino", value: "m" },
                { label: "Feminino", value: "f" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
