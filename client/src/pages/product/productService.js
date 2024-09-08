import { axiosInstance } from "../../utils/axiosInstance";

// Fetch all products
export const fetchProducts = async (searchTerm = "") => {
  try {
    const response = await axiosInstance.get(
      `/products${searchTerm ? `?name=${searchTerm}` : ""}`
    );
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || "Failed to fetch products");
    return [];
  }
};

// Example of fetching a single product (protected route)
export const fetchProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}
      `);
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || "Failed to fetch product");
    return null;
  }
};
