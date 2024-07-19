import { useState } from "react";
import { newStore as newStoreRequest } from '../../../services'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useNewStore = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const newStore = async (name, phone, direction, imgUrl, coordenadas) => {
        const response = await newStoreRequest({
            name,
            phone,
            direction,
            user,
            imgUrl,
            coordenadas
        })

        toast.success('New store sucess');

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }

        navigate('/')
    }
    return {
        newStore,
        isLoading
    }
}