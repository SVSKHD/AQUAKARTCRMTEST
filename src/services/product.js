import axios from "axios"

let baseUrl = process.env.NEXT_PUBLIC_API_URL;

const createProduct = async (data) => (
    await axios.post(`${baseUrl}/product`, data)
)

const updatedProduct = async (data, id) => (
    await axios.post(`${baseUrl}/product?id=${id}`, data)
)

const getProducts = async () => (
    await axios.get(`${baseUrl}/product/get`)
)

const getProductById = async (query) => (
    await axios.get(`${baseUrl}/product/get?id=${query}`)
)



const productOperations = () => {
    return {
        createProduct,
        getProducts,
        getProductById,
        updatedProduct
    }
}

export default productOperations