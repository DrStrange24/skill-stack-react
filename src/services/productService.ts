import axios from "axios";
import { LOCAL_URL } from "../constant/url";

axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("authToken")}`;

export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axios.get<IProduct[]>(`${LOCAL_URL}/product`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId: number): Promise<IProduct> => {
  try {
    const response = await axios.get<IProduct>(
      `${LOCAL_URL}/product/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postProduct = async (
  product: Omit<IProduct, "id">
): Promise<IProduct> => {
  try {
    const response = await axios.post<IProduct>(
      `${LOCAL_URL}/product`,
      product
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    await axios.delete(`${LOCAL_URL}/product/${productId}`);
  } catch (error) {
    throw error;
  }
};

// Edit a product by ID
export const editProduct = async (
  productId: number,
  updatedProduct: Omit<IProduct, "id">
): Promise<IProduct> => {
  try {
    const response = await axios.put<IProduct>(
      `${LOCAL_URL}/product/${productId}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
