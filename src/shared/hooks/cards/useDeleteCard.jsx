import { useState } from "react";
import { deleteCard as deleteCardRequest } from '../../../services';
import toast from "react-hot-toast";

export const useDeleteCard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteCard = async (token) => {
        setIsLoading(true);

        const response = await deleteCardRequest(token);

        setIsLoading(false);

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrió un error, inténtalo de nuevo');
        }

        toast.success('Tarjeta eliminada exitosamente');
    }

    return {
        deleteCard,
        isLoading
    }
}