import { useEffect, useState } from "react";
import { listCards as listCardsRequest } from '../../../services';

export const useListCards = () => {
    const [cards, setCards] = useState([]);
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const fetchCards = async () => {

        const response = await listCardsRequest({userId})

        if (response.error) {
            return console.error(response.e?.response?.data || 'Ocurrió un error, inténtalo de nuevo');
        }

        setCards(response.data);
    }

    useEffect(() =>{
        fetchCards()
    }, [])

    return {
        cards,
        isFetching: !cards
    }
}