import { Card, Col, Input, Menu, Form } from "antd";

import BaseTemplate from "../../components/TemplatePage";

export default function Home() {
  const fieldsForm = () => {
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
      pageHeader={{
        title: "Home",
        acoesMenu: (
          <>
            <Menu>
              <Menu.Item key="aaaa">aaaaaaa</Menu.Item>
              <Menu.Item key="bbbb">bbbbaaa</Menu.Item>
              <Menu.Item key="cccc">ccccaaa</Menu.Item>
              <Menu.Item key="dddd">ddddaaa</Menu.Item>
            </Menu>
          </>
        ),
        showFilter: true,
        fieldsfilterAvancado: fieldsForm,
      }}
    >
      <Card title="Lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quam
        necessitatibus illo fugit natus optio minima omnis vel, accusamus
        similique quod esse nostrum quisquam architecto! Adipisci at nemo enim
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident.
      </Card>
      <Card title="Lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quam
        necessitatibus illo fugit natus optio minima omnis vel, accusamus
        similique quod esse nostrum quisquam architecto! Adipisci at nemo enim
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident.
      </Card>
      <Card title="Lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quam
        necessitatibus illo fugit natus optio minima omnis vel, accusamus
        similique quod esse nostrum quisquam architecto! Adipisci at nemo enim
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident.
      </Card>
      <Card title="Lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quam
        necessitatibus illo fugit natus optio minima omnis vel, accusamus
        similique quod esse nostrum quisquam architecto! Adipisci at nemo enim
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident.
      </Card>
      <Card title="Lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quam
        necessitatibus illo fugit natus optio minima omnis vel, accusamus
        similique quod esse nostrum quisquam architecto! Adipisci at nemo enim
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quam necessitatibus illo fugit natus optio minima omnis vel,
        accusamus similique quod esse nostrum quisquam architecto! Adipisci at
        nemo enim provident.
      </Card>
    </BaseTemplate>
  );
}
