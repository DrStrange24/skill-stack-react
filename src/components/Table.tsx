import React, { useState } from "react";
import {
  Table as BootstrapTable,
  Button,
  ButtonGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { PencilSquare, Plus, Trash } from "react-bootstrap-icons";
import { ConfirmationModal } from "./ConfirmationModal";

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
  editItem: (item: any) => void;
  formItems: { label: string; variable: string }[];
}

export const Table = <T,>(props: TableProps<T>) => {
  const { data, columns, addItem, deleteItem, editItem, formItems } = props;

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<any>(null);
  const [updatedItem, setUpdatedItem] = useState<any>(null);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [toDeleteItem, setToDeleteItem] = useState<any>(null);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowAddModal}>
        <Plus /> Add Item
      </Button>
      <BootstrapTable striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor as string}>{column.header}</th>
            ))}
            <th></th>
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
              <td style={{ width: "100px" }}>
                <ButtonGroup>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleShowEditModal();
                      setUpdatedItem(item);
                    }}
                    aria-label="Edit"
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setToDeleteItem(item);
                      setShowConfirmationModal(true);
                    }}
                    aria-label="Delete"
                  >
                    <Trash />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
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
          <Button
            variant="primary"
            onClick={() => {
              addItem(newItem);
              handleCloseAddModal();
              setNewItem(null);
            }}
          >
            Add Item
          </Button>
          <Button variant="danger" onClick={handleCloseAddModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formItems.map((item, index) => (
              <Form.Group key={index} className="mt-3">
                <Form.Label>{item.label}</Form.Label>
                <Form.Control
                  placeholder={`Enter ${item.label}`}
                  value={
                    updatedItem && updatedItem[item.variable]
                      ? updatedItem[item.variable]
                      : ""
                  }
                  onChange={(event) =>
                    setUpdatedItem((state: any) => ({
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
          <Button
            variant="primary"
            onClick={() => {
              editItem(updatedItem);
              handleCloseEditModal();
              setUpdatedItem(null);
            }}
          >
            Save
          </Button>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmationModal
        show={showConfirmationModal}
        title={"Warning"}
        body={"Are you sure you want to delete this item?"}
        handleClose={() => {
          setToDeleteItem(null);
          setShowConfirmationModal(false);
        }}
        handleConfirm={() => {
          deleteItem(toDeleteItem);
          setToDeleteItem(null);
          setShowConfirmationModal(false);
        }}
      />
    </div>
  );
};
