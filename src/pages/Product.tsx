import React, { useEffect, useState } from "react";
import { getAllProducts, IProduct } from "../services/productService";

export const Product: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log("data", data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      <h1>Product Page</h1>
    </>
  );
};
