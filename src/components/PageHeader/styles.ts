import { Typography } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px -6px #222;
  z-index: 50;
  display: grid;
  justify-content: space-between;
  padding: 7px 15px;
  align-items: center;
  grid-gap: 15px;
  grid-auto-flow: column;
`;

export const ContainerTitle = styled.div`
`;

export const Title = styled(Typography.Title)`
  margin-bottom: 0px;
  display: inline;
`;


