import {axiosInstance} from './genApi'

export const getManagers = async () => {
    try {
        const response = await axiosInstance.get('manager/getmanagers');
        if(response.statusText == 'OK') return response.data.data;

    } catch (error) {
        console.log(error)
    }
}