import styled from "styled-components";
import { Input } from "antd";

export type eventSearch =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLElement, MouseEvent>
  | React.KeyboardEvent<HTMLInputElement>
  | undefined;

export type onSearchProp = (value: string, onSearch: eventSearch) => void;

export type InputSearchTextProps = {
  onSearch: onSearchProp;
};

export const InputSearchText = styled(Input.Search)`
  max-width: 400px;
  width: 100%;
`;

export default InputSearchText;
