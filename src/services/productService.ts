import axios from "axios";

const LOCAL_URL = "https://localhost:7171";

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
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId: number): Promise<IProduct> => {
  try {
    const response = await axios.get<IProduct>(
      `${LOCAL_URL}/products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};
