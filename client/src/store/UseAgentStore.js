import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const UseAgentStore = create((set, get) =>({
    isLoading: false,
    agents: null,

    addAgent: async(data) =>{
        set({ isLoading: true });
        try {
            await axiosInstance.post('/agent/create',data);
            set({ isLoading: false })
            await get().getAllAgents();
            toast.success("New Agent Added")
        } catch (error) {
            await get().getAllAgents();
            console.log(error);
            if(error.response){
                const msg = error.response?.data.message || 'Fail to add';
                toast.error(msg)
            }
        }
    },

    getAllAgents: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/agent/get');
            set({ isLoading: false, agents: response.data.data });
        } catch (error) {
            console.log(error);
            set({ isLoading: false })
            if(error.response){
                const msg = error.response?.data.message || 'Fail to load';
                toast.error(msg)
            }
        }
    },

    updateAgent: async(data, id) =>{
        set({ isLoading: true });
        try {
            await axiosInstance.put(`/agent/update/${id}`,data);
            set({ isLoading: false })
            await get().getAllAgents();
            toast.success("Agent updated")
        } catch (error) {
            console.log(error);
            if(error.response){
                const msg = error.response?.data.message || 'Fail to add';
                toast.error(msg)
            }
        }
    },

    deleteAgent: async(id) =>{
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/agent/delete/${id}`);
            set({ isLoading: false});
            await get().getAllAgents();
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