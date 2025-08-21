import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const UseListStore = create((set, get) =>({
    isLoading: false,
    distributions: null,

    uploadFile: async(file) =>{
        set({ isLoading: true });
        try {
            await axiosInstance.post('/list/upload',file);
            await get().getAllDistributions();
            set({ isLoading: false });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            if(error.response){
                const msg = error.response?.data.message || 'Fail';
                toast.error(msg)
            }
        }
    },

    getAllDistributions: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/list/');
            set({ isLoading: false, distributions: response.data.data })
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            if(error.response){
                const msg = error.response?.data.message || 'Fail';
                toast.error(msg)
            }
        }
    }
}))