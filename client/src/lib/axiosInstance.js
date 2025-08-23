import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://machine-test-mern.onrender.com/api',
    withCredentials: true
});