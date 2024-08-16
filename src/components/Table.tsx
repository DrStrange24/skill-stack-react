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
}

export const Table = <T,>(props: TableProps<T>) => {
  const { data, columns, addItem, deleteItem } = props;

  const [show, setShow] = useState(false);

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
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Enter product name"
                value={'default'}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              /> */}
            </Form.Group>
            <Form.Group controlId="formProductPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              {/* <Form.Control
                type="number"
                placeholder="Enter price"
                value={'default'}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              addItem({});
            }}
          >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
