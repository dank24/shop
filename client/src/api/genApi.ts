import axios from 'axios'
const serverBaseUrl = 'http://localhost:5378/';
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: serverBaseUrl,
    headers: {'Content-Type': 'application/json'}
})
axiosInstance.interceptors.request.use(config => {
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})


const getMktWeek = async() => {
    try {
        const res = await axiosInstance.get('/utils/getcurrentweek')
        if(res.statusText == 'OK') return res.data.data

    } catch (error) {
        console.log(error)
    }
}

const getMktWeeks = async() => {
    try {
        const response = await axiosInstance('/utils/getmktweeks');
        if(response.statusText == 'OK' ) return response.data.data

    } catch (error) {
        console.log(error)
        return {message: error}
    }

}

export {axiosInstance, getMktWeek, getMktWeeks}