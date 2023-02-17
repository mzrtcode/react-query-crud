import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import React from 'react'
import { getProducts, deleteProduct, updateProduct } from '../api/productosAPI'

function Products() {

    const queryClient = useQueryClient()
    

    const {isLoading, data: products, isError, error} = useQuery({
        queryKey: ['products'], //nombre de la peticion para que se guarde en cache
        queryFn: getProducts, //Nuestra peticion
        select: products => products.sort((a,b)  => b.id - a.id)
    })

    const  deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        }
    })


    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        }
    })



    if(isLoading) return <p>Cargando...</p>
    if(isError) return <p>{error}</p>


    
  return products.map(product =>  (
    <div key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button onClick={()=>{deleteProductMutation.mutate(product.id)}}>
            Delete
        </button>
        <input
        id={product.id} 
        checked={product.inStock} 
        onChange={(e)=>{
            updateProductMutation.mutate({...product, inStock: e.target.checked})
        } } type="checkbox" />
        <label htmlFor={product.id}>In Stock</label>
    </div>
  ))
}

export default Products