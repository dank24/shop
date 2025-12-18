import {axiosInstance} from './genApi'

export const getProducts = async() => {
    try {
        const respone = await axiosInstance.get('/product/getproducts');
        console.log(respone.data)
        if(respone.statusText == 'OK') return respone.data.data;

    } catch (error) {
        console.log(error)

    }
}

export const getProductsViaAccess = async(access) => {
    try {
        const response = await axiosInstance.get(`/product/getproductsviaaccess/${access}`);
        console.log(response.data);
        
    } catch (error) {
        console.log(error);

    }
}

export const prdMovement = async(sData) => {
    try {
        const response = await axiosInstance.post('/product/prdmovement', sData);
        if(response.statusText == 'OK') return response.data

    } catch (error) {
        console.log(error.response.data)
        return {message: error.response.data.message}
        
    }
}