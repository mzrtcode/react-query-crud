import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { createProduct } from '../api/productosAPI'

const ProductForm = () => {


    const queryClient = useQueryClient()
    
    


    const addProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: ()=> {
            console.log('Product added!')
            queryClient.invalidateQueries('productos')
            
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target) //Para convertir el formulario en un objeto de javascript
        const product = Object.fromEntries(formData)
        // {name: 'test', description: 'test2', price: '323232'}
        
        addProductMutation.mutate({...product, inStock: true})
    }
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Name:</label>
        <input type="text" id='name' name="name" />

        <label htmlFor="">Description:</label>
        <input type="text" id='description' name='description' />

        <label htmlFor="">Price</label>
        <input type="number" name="price" id="price" />

        <button>Add product 🎁</button>
    </form>
  )
}

export default ProductForm