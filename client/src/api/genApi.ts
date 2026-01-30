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

const getGen = async(index: String) => {
    try {
        const response = await axiosInstance.get('/utils/getgen/' + index);
        if(response.statusText == 'OK') return response.data.data

    } catch (error) {
        console.log({error: error})
        return error.response
    }
}

const createYear = async(year: String) => {
    try {
        const response = await axiosInstance.post('utils/createyear', {year} );
        if(response.statusText == 'Created') return {status: 'success', data: response.data.data}
    } catch (error) {
        console.log(error)
    }
}

const getYears = async() => {
    try {
        const response = await axiosInstance.get('/utils/getyears');
        if(response.statusText == 'OK') return {status: 'success', data: response.data.data}
    } catch (error) {
        console.log(error)
    }
}

const getMktWeek = async() => {
    try {
        const res = await axiosInstance.get('/utils/getcurrentweek')
        if(res.statusText == 'OK') return res.data.data

    } catch (error) {
        console.log(error)
    }
}

const getMktWeeks = async(year: String, limit: number) => {
    let url: string;
    !limit ? (
        url = '/utils/getmktweeks/' + year
    ) : (
        url = '/utils/getmktweeks/' + year + '/' + limit
    )

    try {
        const response = await axiosInstance(url);
        if(response.statusText == 'OK' ) return {status: 'success', data: response.data.data}
        console.log(response.statusText)

    } catch (error) {
        console.log(error)
        return {message: error}
    }

}

const getBalanceWeeksForStore = async(storeId: string) => {
    try {
        const response = await axiosInstance.get('utils/getweeksforcalc/' + storeId);
        if(response.statusText == 'OK') return response.data;

    } catch (error) {
        console.log(error);
        return {status: 'error', message: error};
    }

}

const getBalanceSelections = async(data: Object) => {
    const response = await axiosInstance.get('utils/getbalancedelection/' + JSON.stringify(data));
    if(response.statusText == 'OK') return {}
}

/* HANDLE */

export {axiosInstance, getMktWeek, getMktWeeks, getYears, createYear, getBalanceSelections,
    getBalanceWeeksForStore, getGen
}