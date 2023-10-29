import axios from "axios"


const createSubCategory = async (data) => (
    await axios.post(`admin/crm/api/subcategory`, data)
)

const updatedSubCategory = async (data, id) => (
    await axios.post(`admin/crm/api/subcategory?id=${id}`, data)
)

const getSubCategories = async () => (
    await axios.get(`admin/crm/api/subcategory/get`)
)

const getSubCategoryById = async (query) => (
    await axios.get(`admin/crm/api/subcategory/get?id=${query}`)
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