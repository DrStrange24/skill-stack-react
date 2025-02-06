import axios from "axios";
import { LOCAL_URL } from "../constant/url";

axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("authToken")}`;

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailConfirmed: boolean;
  roles: string[];
}

export interface IPostUser {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roles: string[];
}

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>(`${LOCAL_URL}/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>(`${LOCAL_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUser = async (user: IPostUser): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>(`${LOCAL_URL}/user`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${LOCAL_URL}/user/${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string,
  updatedUser: Omit<IUser, "id">
): Promise<IUser> => {
  try {
    const response = await axios.put<IUser>(
      `${LOCAL_URL}/user/${id}`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
