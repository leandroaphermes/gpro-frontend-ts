import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import ListaMarcadores, {
  ListaMarcadoresProps,
} from "components/ListaMarcadores";
import { MarcadorType } from "types/marcador";

export type MarcadoresProps = {
  onChange: (value: MarcadorType["id"][]) => Promise<void>;
} & ListaMarcadoresProps;

function Marcadores({ onChange, ...restPropsLista }: MarcadoresProps) {
  const [controleModalEditar, setControleModalEditar] = useState(false);

  return (
    <>
      <ListaMarcadores {...restPropsLista} />
      <Tooltip title="Editar Marcadores">
        <Button
          type="text"
          onClick={() => setControleModalEditar(true)}
          icon={
            <TagTwoTone twoToneColor="#eb2f96" style={{ fontSize: "20px" }} />
          }
        />
      </Tooltip>
    </>
  );
}

export default Marcadores;
