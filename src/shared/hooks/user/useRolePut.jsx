import { useState } from "react";
import { rolesin } from '../../../services'
import toast from "react-hot-toast";

export const useRolePut = () => {
    const [isLoading, setIsLoading] = useState(false)
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const updateRole = async (role) => {
        const response = await rolesin({
            userId, 
            role
        })

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        updateRole,
        isLoading
    }
}