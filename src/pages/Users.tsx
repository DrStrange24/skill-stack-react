import { ReactElement, useEffect, useState } from "react";
import { Table, TableColumn, Loading } from "../components";
import { useRequireAuthentication } from "../helpers/authHelpers";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  IUser,
} from "../services/userService";
import { toast } from "react-toastify";

export const Users = (): ReactElement => {
  useRequireAuthentication();

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

  const handleAddProduct = async (newProduct: IUser) => {
    try {
      setLoading(true);
      // const addedProduct = await postProduct(newProduct);
      // setData([...data, addedProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
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
  // {
  //   header: "Roles",
  //   accessor: "roles" as keyof IUser,
  //   Cell: (user: IUser) => `$${user.FirstName}`,
  // },
];
