import { Button, Result } from "antd";

import { Wrapper } from "./styles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Error404({ showGoHome }: { showGoHome?: boolean }) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Result
        title="Error 404"
        subTitle="Pagina não encontrada"
        status="404"
        extra={
          <>
            {showGoHome ? (
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/")}
                key="goToHome"
              >
                Ir para o inicio
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                key="back"
              >
                Voltar
              </Button>
            )}
          </>
        }
      />
    </Wrapper>
  );
}
