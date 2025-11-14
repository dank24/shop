import axios from 'axios'

interface userDataTy { name: string, email: string, password: string }

/* variables */
const baseUserURL = 'http://localhost:5378/user';
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
        const resp = await axiosinstance.post('/user/register', registerData);
        return resp.data.token
        
    } catch (error) {
        throw error.response?.data.message || {message: 'login error'}

    }
}// register_user_fn


export const add_prop = async(data: {}) => {
    const urls = ['/add_store', '/add_manager', 'add_product'];
    const useUrl = urls[data['index']];

    console.log('dataIndex', useUrl)
    console.log('data', data)
    //const response = await axiosinstance.post(useUrl, data)
}