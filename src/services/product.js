import axios from "axios";

const createProduct = async (data) =>
  await axios.post(`/admin/crm/api/product`, data);

const updatedProduct = async (data, id) =>
  await axios.post(`/admin/crm/api/product?id=${id}`, data);

const getProducts = async () => await axios.get(`/admin/crm/api/product/get`);

const getProductById = async (query) =>
  await axios.get(`admin/crm/api/product/get?id=${query}`);

const productOperations = () => {
  return {
    createProduct,
    getProducts,
    getProductById,
    updatedProduct,
  };
};

export default productOperations;
