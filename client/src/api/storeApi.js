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

