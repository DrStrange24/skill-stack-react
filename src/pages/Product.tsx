import React, { useEffect, useState } from "react";
import { getAllProducts, IProduct } from "../services/productService";
import { Table, Column } from "../components";

const productColumns: Column<IProduct>[] = [
  { header: "ID", accessor: "id" as keyof IProduct },
  { header: "Name", accessor: "name" as keyof IProduct },
  {
    header: "Price",
    accessor: "price" as keyof IProduct,
    Cell: (product: IProduct) => `$${product.price.toFixed(2)}`,
  },
];

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
      <div className="container mt-5">
        {loading && <div>Loading...</div>}
        <h1>Product List</h1>
        <Table data={products} columns={productColumns} />
      </div>
    </>
  );
};
