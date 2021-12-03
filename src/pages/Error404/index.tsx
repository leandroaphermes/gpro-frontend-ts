import { Button, Result } from "antd";

import { Wrapper } from "./styles";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Error404() {
  return (
    <Wrapper>
      <Result
        title="Error 404"
        subTitle="Pagina não encontrada"
        status="404"
        extra={
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Voltar
          </Button>
        }
      />
    </Wrapper>
  );
}
