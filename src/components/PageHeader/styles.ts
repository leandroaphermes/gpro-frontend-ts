import { Typography } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px -6px #222;
  z-index: 10;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 7px 15px;
  align-items: center;
`;

export const ContainerTitle = styled.div`
`;

export const Title = styled(Typography.Title)`
  margin-bottom: 0px;
  display: inline;
`;


