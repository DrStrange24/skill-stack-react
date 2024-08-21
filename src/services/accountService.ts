import axios from "axios";
import { LOCAL_URL } from "../constant/url";

export interface ISignup {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const signup = async (userData: ISignup) => {
  try {
    const response = await axios.post(LOCAL_URL, userData);
    return response.data;
  } catch (error) {
    console.error("There was an error signing up!", error);
    throw error;
  }
};
