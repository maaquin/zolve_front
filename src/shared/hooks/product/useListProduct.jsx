import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {listProducts as listProductsRequest} from '../../../services/api'

export const useListProduct = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const listProducts = async () => {
        setLoading(true)
        const response = await listProductsRequest();
        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al obtener los productos, intentalo de nuevo')
        }
        setProducts(response.data)
        setLoading(false)
    }
    
    return {
        listProducts,
        products,
        loading
    }
}