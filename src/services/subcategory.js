import axios from "axios"


const createSubCategory = async (data) => (
    await axios.post(`${process.env.apiKey}/subcategory`, data)
)

const updatedSubCategory = async (data, id) => (
    await axios.post(`${process.env.apiKey}/subcategory?id=${id}`, data)
)

const getSubCategories = async () => (
    await axios.get(`${process.env.apiKey}/subcategory/get`)
)

const getSubCategoryById = async (query) => (
    await axios.get(`${process.env.apiKey}/subcategory/get?id=${query}`)
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