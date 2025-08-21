import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';

export const UseAuthStore = create((set) =>({
    isLoading: false,
    auth: null,
    isAuthenticated: false,

    login: async(data) =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/auth/login',data);
            set({ isLoading: false, isAuthenticated: true, auth: response.data });
            Navigate('/')
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            if(error.response){
                const msg = error.response.data?.message || 'Login Failed';
                toast.error(msg);
            }
        }
    },

    profile: async() =>{
         set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/auth/profile');
            set({ isLoading: false, isAuthenticated: true, auth: response.data });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            if(error.response){
                const msg = error.response.data?.message || 'Fail to load';
                toast.error(msg);
            }
        }
    }
}))