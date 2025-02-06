import axios from "axios";
import { Product } from "../types/product";

const BASE_URL = "http://localhost:3000/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createProduct = async (product: Omit<Product, "_id" | "createdAt" | "updatedAt">) => {
  await axios.post(BASE_URL, product);
};

export const deleteProduct = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const updateProduct = async (
    id: string, // The ID of the product to update
    updatedProduct: Partial<Omit<Product, "_id" | "createdAt" | "updatedAt">> // The updated fields
  ): Promise<void> => {
    await axios.put(`${BASE_URL}/${id}`, updatedProduct);
  };