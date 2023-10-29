import axios from "axios"

let baseUrl = `https://aquakart.co.in/admin/crm/api`;

const createCategory = async (data) => (
    await axios.post(`${baseUrl}/category`, data)
)

const updatedCategory = async (data, id) => (
    await axios.post(`${baseUrl}/category?id=${id}`, data)
)

const getCategories = async () => (
    await axios.get(`${baseUrl}/category/get`)
)

const getCategoryById = async (query) => (
    await axios.get(`${baseUrl}/category/get?id=${query}`)
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