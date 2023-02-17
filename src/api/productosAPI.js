import axios from 'axios'

const productApi = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getProducts = async () => {
    const res = await productApi.get('/productos')
    return res.data
}

export const createProduct = async (product) => productApi.post('/productos', product)

export const deleteProduct  = id => productApi.delete(`/productos/${id}`)

export const updateProduct = product => productApi.put(`/productos/${product.id}`, product)