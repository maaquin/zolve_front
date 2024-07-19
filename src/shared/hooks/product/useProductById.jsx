import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { productById as productByIdRequest } from '../../../services/api'

export const useProductById = () => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const productById = async (id) => {
        setLoading(true)
        const response = await productByIdRequest(id);
        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al obtener el producto')
        }
        setProduct(response.data)
        setLoading(false)
    }
    
    return {
        productById,
        product,
        charging: loading
    }
}