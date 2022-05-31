import styled, { css } from "styled-components";

export type WrapperProps = {
  transparent?: boolean;
  full?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  text-align: center;
  background-color: ${(props) =>
    props.transparent ? `rgba(255, 255, 255, 0.2)` : `rgba(255, 255, 255, 1)`};
  border-radius: 4px;
  padding: 30px 50px;
  ${(props) =>
    props.full
      ? css`
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          margin: 20px 0;
        `}
`;
