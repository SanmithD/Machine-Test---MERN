import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const UseAuthStore = create((set) => ({
  isLoading: false,
  auth: null,
  isAuthenticated: false,

  login: async (data, navigate) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);

      localStorage.setItem("token", response.data.token);

      set({
        isLoading: false,
        isAuthenticated: true,
        auth: response.data.user,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      if (error.response) {
        const msg = error.response.data?.message || "Login Failed";
        toast.error(msg);
      }
    }
  },

  profile: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.get("/auth/profile");
      set({
        isLoading: false,
        isAuthenticated: true,
        auth: response.data,
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ isLoading: false, isAuthenticated: false, auth: null });
      if (error.response) {
        const msg = error.response.data?.message || "Session expired";
        toast.error(msg);
      }
    }
  },

  logout: async (navigate) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      set({ isLoading: false, isAuthenticated: false, auth: null });
      navigate("/login");
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      if (error.response) {
        const msg = error.response.data?.message || "Fail to logout";
        toast.error(msg);
      }
    }
  },
}));
