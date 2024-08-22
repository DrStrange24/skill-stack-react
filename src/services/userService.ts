import axios from "axios";
import { LOCAL_URL } from "../constant/url";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
}

export const getProfile = async (id: string) => {
  try {
    const response = await axios.get(`${LOCAL_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
