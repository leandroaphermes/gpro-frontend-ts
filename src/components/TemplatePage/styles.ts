import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export type EnumContainerProp = "full" | "central";

export type ContainerPageProps = {
  container?: EnumContainerProp
}

export const ContentPage = styled.div<ContainerPageProps>`
  padding: 15px;
  overflow: auto;
  ${props => props.container === "central" && css`
    width: 100%;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  `}
`;
