import axios from "axios"

let baseUrl = process.env.NEXT_PUBLIC_API_URL;

const createSubCategory = async (data) => (
    await axios.post(`${baseUrl}/subcategory`, data)
)

const updatedSubCategory = async (data, id) => (
    await axios.post(`${baseUrl}/subcategory?id=${id}`, data)
)

const getSubCategories = async () => (
    await axios.get(`${baseUrl}/subcategory/get`)
)

const getSubCategoryById = async (query) => (
    await axios.get(`${baseUrl}/subcategory/get?id=${query}`)
)



const subCategoryOperations = () => {
    return {
        createSubCategory,
        getSubCategories,
        getSubCategoryById,
        updatedSubCategory
    }
}

export default subCategoryOperations