import axios from "axios";
import { LOCAL_URL } from "../constant/url";

export const getProfile = async (id: string) => {
  try {
    const response = await axios.get(`${LOCAL_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
