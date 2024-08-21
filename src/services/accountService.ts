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
    const response = await axios.post(`${LOCAL_URL}/account/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await axios.post(`${LOCAL_URL}/account/login`, {
      usernameOrEmail,
      password,
    });
    // Assuming the token or user data is in response.data
    return response.data;
  } catch (error) {
    throw error;
  }
};
