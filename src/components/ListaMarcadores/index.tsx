import { Space, Tag } from "antd";
import React from "react";
import { MarcadorType } from "types/marcador";

export type ListaMarcadoresProps = {
  dataSource: MarcadorType[];
  wrap?: boolean;
};

export default function ListaMarcadores({
  dataSource,
  wrap,
}: ListaMarcadoresProps) {
  return (
    <Space size={0} wrap={wrap}>
      {dataSource.map((row) => (
        <Tag color={row.cor_hex} key={row.id} style={{ lineHeight: "17px" }}>
          {row.nome}
        </Tag>
      ))}
    </Space>
  );
}
