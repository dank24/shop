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


export {axiosInstance}