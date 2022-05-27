import { Card, Menu } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import BaseTemplate from "components/TemplatePage";

import { mockData } from "./mock";
import { useParams } from "react-router-dom";

export default function ClientesView() {
  const { id } = useParams();

  const data = mockData.find((user) => user._id === id);

  console.log(id);

  const menu = (
    <Menu
      items={[
        {
          key: "info",
          label: "Informações",
          icon: <InfoCircleOutlined />,
        },
      ]}
    />
  );

  return (
    <BaseTemplate
      container="central"
      headerProps={{
        title: `Cliente: ${data?.name}`,
        onSave: console.log,
        showSave: true,
        showSearch: false,
        acoesMenu: menu,
      }}
    >
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas officiis
        repellendus architecto dignissimos explicabo animi sint perferendis
        soluta vitae ratione iusto officia beatae iure quasi incidunt fugit
        blanditiis, id exercitationem?
      </Card>
    </BaseTemplate>
  );
}
