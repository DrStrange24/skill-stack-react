import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  Cell?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <BootstrapTable striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor as string}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.accessor as string}>
                {column.Cell
                  ? column.Cell(item)
                  : String(item[column.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
};
