import React, { useState } from "react";
import { Table as BootstrapTable, Button, Form, Modal } from "react-bootstrap";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  Cell?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  addItem: (item: any) => void;
  deleteItem: (item: any) => void;
  formItems: { label: string; variable: string }[];
}

export const Table = <T,>(props: TableProps<T>) => {
  const { data, columns, addItem, deleteItem, formItems } = props;

  const [show, setShow] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <BootstrapTable striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor as string}>{column.header}</th>
            ))}
            <th>Actions</th>
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
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formItems.map((item, index) => (
              <Form.Group key={index} className="mt-3">
                <Form.Label>{item.label}</Form.Label>
                <Form.Control
                  placeholder={`Enter ${item.label}`}
                  value={
                    newItem && newItem[item.variable]
                      ? newItem[item.variable]
                      : ""
                  }
                  onChange={(event) =>
                    setNewItem((state: any) => ({
                      ...state,
                      [item.variable]: event.target.value,
                    }))
                  }
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addItem(newItem);
              handleClose();
              setNewItem(null);
            }}
          >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
