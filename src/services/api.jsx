import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://zolve-back.vercel.app/zolve/v1',
    timeout: 1000
})

//User
export const login = async (data) => {
    try{
        return await apiClient.post('/auth/login', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const register = async (data) => {
    try{
        return await apiClient.post('/auth/register', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const updateUser = async (data, token) => {
    try{
        const response = await apiClient.put('/settings/update', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const putUserSettings = async (data) => {
    try{
        return await apiClient.put('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async (data) => {
    try{
        return await apiClient.post('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async (data) => {
    try{
        return await apiClient.patch('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const confirmToken = async (token) => {
    try{
        return await apiClient.patch(`/confirm/${token}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const rolesin = async (data) => {
    try{
        return await apiClient.put('/settings/role', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

//Store
export const newStore = async (data) => {
    try{
        return await apiClient.post('/store', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getStores = async () => {
    try {
        return await apiClient.get('/store'); // Ajusta la URL según tu API
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
}
export const getStoresDetails = async (storeId) => {
    try{
        return await apiClient.get(`/store/${storeId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getStoresUser = async (user) => {
    try{
        return await apiClient.post('/store/user', user)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const updateStores = async (data) => {
    try{
        return await apiClient.put('/store/update', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

//CreditCard
export const token = async () => {
    console.log(data)
    try {
        const response = await apiClient.get('/settings/token');
        return response.data.clientToken;
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
}
export const listCards = async ( data ) => {
    console.log(data)
    try {
        return await apiClient.post('/settings/cards', data);
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
}
export const newCard = async ( data ) => {
    try {
        return await apiClient.post('/settings/newCard', data);
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
}
export const checkout = async () => {
    try {
        return await apiClient.post('/settings/checkout');
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
}
export const deleteCard = async (token) => {
    try{
        return await apiClient.delete(`/settings/deleteCard/${token}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}