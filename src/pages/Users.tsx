import { ReactElement, useEffect, useState } from "react";
import {
  TableColumn,
  Loading,
  ConfirmationModal,
  TableProps,
} from "../components";
import { useRequireAdminAuthentication } from "../helpers/authHelpers";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  IUser,
  postUser,
  IPostUser,
} from "../services/userService";
import { toast } from "react-toastify";
import {
  Badge,
  Table as BootstrapTable,
  Button,
  ButtonGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { PencilSquare, Plus, Trash } from "react-bootstrap-icons";

export const Users = (): ReactElement => {
  useRequireAdminAuthentication();

  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async (newUser: IPostUser) => {
    try {
      setLoading(true);
      const addedUser = await postUser(newUser);
      setData([...data, addedUser]);
      toast.success("User added successfully");
    } catch (error) {
      toast.error(`Error adding product: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (user: IUser) => {
    const id = user.id;
    try {
      setLoading(true);
      await deleteUser(id);
      setData(data.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(`Error deleting user with ID ${id}: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (user: IUser) => {
    try {
      const updatedChanges = await updateUser(user.id, user);
      setData((users) =>
        users.map((currentUser) =>
          user.id === currentUser.id
            ? { ...currentUser, ...updatedChanges }
            : currentUser
        )
      );
      toast.success("user updated successfully");
    } catch (error) {
      toast.error(`Error updating user: ${error}`);
    }
  };

  const formItems = [
    { label: "Username", variable: "userName" },
    { label: "Email", variable: "email" },
    { label: "First Name", variable: "firstName" },
    { label: "Last Name", variable: "lastName" },
  ];

  return (
    <div className="container mt-5">
      {loading && <Loading />}
      <h1>User Management</h1>
      <Table
        data={data}
        columns={columns}
        addItem={handleAddProduct}
        deleteItem={handleDeleteProduct}
        editItem={handleEditProduct}
        formItems={formItems}
      />
    </div>
  );
};

const columns: TableColumn<IUser>[] = [
  { header: "ID", accessor: "id" as keyof IUser },
  { header: "Username", accessor: "userName" as keyof IUser },
  { header: "Email", accessor: "email" as keyof IUser },
  { header: "First Name", accessor: "firstName" as keyof IUser },
  { header: "Last Name", accessor: "lastName" as keyof IUser },
  { header: "Email Confirmed", accessor: "emailConfirmed" as keyof IUser },
  {
    header: "Roles",
    accessor: "roles" as keyof IUser,
    Cell: (user: IUser) => user.roles?.join(", ") || "User",
  },
];

const Table = <T,>(props: TableProps<T>) => {
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

  const [selectedRole, setSelectedRole] = useState<string>("");
  const availableRoles = ["Admin", "User"];

  const addRole = (newItem: any, setNewItem: any) => {
    if (selectedRole && !newItem?.roles?.includes(selectedRole)) {
      setNewItem((state: any) => ({
        ...state,
        roles: [...(state?.roles || []), selectedRole],
      }));
    }
  };

  const removeRole = (role: string, setNewItem: any) => {
    setNewItem((state: any) => ({
      ...state,
      roles: state?.roles?.filter((r: string) => r !== role),
    }));
  };

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
            <Form.Group className="mt-3">
              <Form.Label>{"Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder={`Enter Password`}
                value={
                  newItem && newItem["password"] ? newItem["password"] : ""
                }
                onChange={(event) =>
                  setNewItem((state: any) => ({
                    ...state,
                    ["password"]: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select a role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>

              <Button
                variant="primary"
                className="mt-2"
                onClick={() => addRole(newItem, setNewItem)}
              >
                Add Role
              </Button>
            </Form.Group>
            <div className="mt-3">
              <strong>Assigned Roles:</strong>
              <div>
                {newItem?.roles?.length ? (
                  newItem.roles.map((role: string) => (
                    <Badge
                      key={role}
                      bg="primary"
                      className="me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeRole(role, setNewItem)}
                    >
                      {role} &times;
                    </Badge>
                  ))
                ) : (
                  <p>No roles assigned.</p>
                )}
              </div>
            </div>
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
            <Form.Group className="mt-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select a role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>

              <Button
                variant="primary"
                className="mt-2"
                onClick={() => addRole(updatedItem, setUpdatedItem)}
              >
                Add Role
              </Button>
            </Form.Group>
            <div className="mt-3">
              <strong>Assigned Roles:</strong>
              <div>
                {updatedItem?.roles?.length ? (
                  updatedItem?.roles?.map((role: string) => (
                    <Badge
                      key={role}
                      bg="primary"
                      className="me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeRole(role, setUpdatedItem)}
                    >
                      {role} &times;
                    </Badge>
                  ))
                ) : (
                  <p>No roles assigned.</p>
                )}
              </div>
            </div>
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
