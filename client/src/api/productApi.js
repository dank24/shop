import {axiosInstance} from './genApi'

export const getProducts = async() => {
    try {
        const respone = await axiosInstance.get('/product/getproducts');
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
        const response = axiosInstance.post('/product/prdmovement', sData);
        console.log((await response).statusText);

    } catch (error) {
        console.log(error.response)
        
    }
}