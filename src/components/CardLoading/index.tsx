import { Spin } from "antd";

import * as S from "./styles";

export default function CardLoading() {
  return (
    <S.Wrapper>
      <Spin spinning />
    </S.Wrapper>
  );
}
