import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {getStoresUser as getStoresUserRequest, updateStores} from "../../../services";

export const useUserStore = () => {
    const [storeDetails, setStoreDetails] = useState();
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const getStoresUser = async () => {
        const responseData = await getStoresUserRequest({user})

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del store'
            )
        }
        setStoreDetails(responseData)
    } 

    const saveSettingsStore = async (data) => {
        const response = await updateStores(data)

        if(response.error){
            return toast.error(
                response.e?.response?.data ||
                'Error al actualizar la información'
            )
        }

        toast.success('Información actualizada exitosamente')
    }

    useEffect(() =>{
        getStoresUser()
    }, [])

    return{
        storeDetails,
        isFetching: !storeDetails,
        getStoresUser,
        saveSettingsStore
    }
}