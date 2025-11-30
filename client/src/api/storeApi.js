import axios from 'axios';
import {axiosInstance} from './genApi'

export const getStores = async() => {
    try {
        const response = await axiosInstance.get('/store/getstores');
        if(response.statusText == 'OK') return response.data.data;

    } catch (error) {
        console.log('Error:', error.response?.data.message)

    }
}

export const getStoresMin = async() => {
    try {
        const response = await axiosInstance.get('store/getstoresminimal')
        if(response.statusText == 'OK') return response.data.data

    } catch (error) {
        console.log(error)
    }
}

export const getStore = async(storeid) => {
    try {
        const response = await axiosInstance.get('/store/getstore/' + storeid);
        if(response.statusText == 'OK') return response.data.data;

    } catch (error) {
        console.log(error)
    }
}

export const prdMovement = async(data) => {
    try {
        const response = await axiosInstance.post('/store/transfers', data)
        console.log(response)

    } catch (error) {
        console.log(error.response)
    }
}