import axios from "axios"
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig;

let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${basePath}`;

const createCategory = async (data) => (
    await axios.post(`${process.env.apiKey}/category`, data)
)

const updatedCategory = async (data, id) => (
    await axios.post(`${process.env.apiKey}/category?id=${id}`, data)
)

const getCategories = async () => (
    await axios.get(`${process.env.apiKey}/category/get`)
)

const getCategoryById = async (query) => (
    await axios.get(`${process.env.apiKey}/category/get?id=${query}`)
)



const categoryOperations = () => {
    return {
        createCategory,
        getCategories,
        getCategoryById,
        updatedCategory
    }
}

export default categoryOperations