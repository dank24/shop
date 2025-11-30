import axios from 'axios'
import { axiosInstance } from './genApi'

interface userDataTy { name: string, email: string, password: string }

/* variables */
const baseUserURL = 'http://localhost:5378/';
const token = localStorage.getItem('token');

const axiosinstance = axios.create({
    baseURL: baseUserURL,
    headers: {"Content-Type": 'application/json'}
})
axios.interceptors.request.use(config => {
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

/*  exports */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token
}// isUthenticated


export const register = async(registerData: userDataTy) => {
    try {
        const resp = await axiosinstance.post('user/register', registerData);
        return resp.data.token
        
    } catch (error) {
        throw error.response?.data.message || {message: 'login error'}

    }
}// register_user_fn


export const add_prop = async(data: {}) => {    
    try {
        const response = await axiosinstance.post('utils/add', data)
        const re = response.data
        console.log('re', re.data)
        return re.data
        
    } catch (error) {
        console.log('err', error.response)
    }
}// add mng,prd,store_ FN

export const createNewMkt = async(id: Number) => {
    const sData = {weekId: id}
    try {
        const response = await axiosInstance.post('utils/createmktweek', sData)
        console.log('this', response.statusText)

    } catch (error) {
        
    }
}

export const getCurrentMktWeek = async() => {
    try {
        const response = await axiosInstance.get('/utils/getcurrentweek');
        if(response.statusText == 'OK') return response.data.data

    } catch (error) {
        console.log(error)
    }
}// get_mkt_week

