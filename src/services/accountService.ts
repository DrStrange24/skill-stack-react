import axios from "axios";
import { LOCAL_URL } from "../constant/url";

axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("authToken")}`;

export interface ISignup {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IProfile {
  userName: string;
  email: string;
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

export const confirmEmail = async (
  userId: string | null,
  token: string | null
) => {
  try {
    const response = await axios.get<{ message: string }>(
      `${LOCAL_URL}/account/confirm-email`,
      {
        params: { userId, token },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profileData: IProfile) => {
  try {
    const response = await axios.put<{ message: string }>(
      `${LOCAL_URL}/account/update-profile`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (password: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.post<{ message: string }>(
      `${LOCAL_URL}/account/change-password`,
      password
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get<IProfile>(`${LOCAL_URL}/account/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
