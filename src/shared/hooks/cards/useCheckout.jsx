import { useState } from "react";
import { checkout as checkoutRequest } from '../../../services';
import toast from "react-hot-toast";

export const useCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);

    const checkout = async (paymentMethodToken, amount) => {
        setIsLoading(true);

        const response = await checkoutRequest({
            paymentMethodToken,
            amount
        });

        setIsLoading(false);

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrió un error, inténtalo de nuevo');
        }

        toast.success('Pago realizado exitosamente');
    }

    return {
        checkout,
        isLoading
    }
}