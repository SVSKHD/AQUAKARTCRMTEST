import axios from "axios";

const createCategory = async (data) =>
  await axios.post(`/admin/crm/api/category`, data);

const updatedCategory = async (data, id) =>
  await axios.post(`/admin/crm/api/category?id=${id}`, data);

const getCategories = async () =>
  await axios.get(`/admin/crm/api/category/get`);

const getCategoryById = async (query) =>
  await axios.get(`admin/crm/api/category/get?id=${query}`);

const categoryOperations = () => {
  return {
    createCategory,
    getCategories,
    getCategoryById,
    updatedCategory,
  };
};

export default categoryOperations;
