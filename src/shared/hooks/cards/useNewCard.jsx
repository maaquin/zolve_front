import React, { useEffect, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { newCard as newCardRequest } from '../../../services';
import toast from 'react-hot-toast';

export const useNewCard = () => {
    const [instance, setInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientToken, setClientToken] = useState(null);
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/zolve/v1/settings/token');
                setClientToken(response.data.clientToken);
                console.log(response.data.clientToken);
            } catch (error) {
                console.error('Error al obtener el token del cliente:', error);
            }
        };
    
        fetchClientToken();
    }, []);    

    useEffect(() => {
        if (clientToken && document.getElementById('dropin-container')) {
            dropin.create({
                authorization: clientToken,
                container: '#dropin-container'
            }, (err, dropinInstance) => {
                if (err) {
                    console.error(err);
                    return;
                }
                setInstance(dropinInstance);
            });
        }
    }, [clientToken]);

    const newCard = async () => {
        if (!instance) {
            console.error('Braintree instance not initialized');
            return;
        }

        setIsLoading(true);

        instance.requestPaymentMethod(async (err, payload) => {
            if (err) {
                console.error(err);
                setIsLoading(false);
                return;
            }

            const response = await newCardRequest({
                customerId: userId,
                paymentMethodNonce: payload.nonce
            });

            setIsLoading(false);

            if (response.error) {
                return toast.error(response.e?.response?.data || 'Ocurrió un error, inténtalo de nuevo');
            }

            toast.success('Nueva tarjeta añadida exitosamente');
        });
    };

    return {
        instance,
        isLoading,
        newCard,
    };
};