import {axiosInstance} from './genApi'

export const getProducts = async() => {
    try {
        const respone = await axiosInstance.get('/product/getproducts');
        if(respone.statusText == 'OK') return respone.data.data;

    } catch (error) {
        console.log(error)

    }
}