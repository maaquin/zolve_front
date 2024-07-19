import { useState } from "react";
import toast from "react-hot-toast";
import { getStores as getStoresRequest } from "../../../services/api";

export const useStores = () => {
    const [stores, setStores] = useState([]);

    const getStores = async () => {
        try {
            const storesData = await getStoresRequest();
            if (storesData.error) {
                return toast.error(
                    storesData.e?.response?.data || 'Error ocurred when reading stores'
                );
            }
            setStores(storesData.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
            toast.error('Error fetching stores');
        }
    };

    return {
        getStores,
        isFetching: !stores,
        allStores: stores,
    };
};
