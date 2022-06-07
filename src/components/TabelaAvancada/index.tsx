import React from "react";
import DataGrid from "devextreme-react/data-grid";
import type { RowClickEvent, Column } from "devextreme/ui/data_grid";

export type TabelaAvancadaColumn<T> = Column<T>[];

export type TabelaAvancadaProps<T> = {
  dataSource: T[];
  columns: TabelaAvancadaColumn<T>;
  rowKey?: string;
  onRowClick: (data: T, event: RowClickEvent<T>["event"]) => void;
};

function TabelaAvancada<T>({
  dataSource,
  columns,
  rowKey,
  onRowClick,
}: TabelaAvancadaProps<T>) {
  function handleRowClick({ data, event, rowType }: RowClickEvent<T>) {
    if (rowType !== "data") return;
    onRowClick(data, event);
  }

  return (
    <DataGrid
      dataSource={dataSource}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      showBorders={true}
      keyExpr={rowKey || "id"}
      groupPanel={{ visible: true }}
      searchPanel={{ visible: true }}
      columns={columns}
      onRowClick={handleRowClick}
    />
  );
}

export default TabelaAvancada;
