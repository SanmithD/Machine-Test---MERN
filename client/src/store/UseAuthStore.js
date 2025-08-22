import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const UseAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,

  login: async (data, navigate) => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      set({
        authUser: res.data.user,
        isCheckingAuth: false,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      set({ isCheckingAuth: false });

      if (error.response) {
        toast.error(error.response.data?.message || "Login failed");
      }
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.get("/auth/profile");

      set({
        authUser: res.data,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");

      set({
        authUser: null,
        isCheckingAuth: false,
      });

      if (error.response && error.response.status !== 401) {
        toast.error(error.response.data?.message || "Session expired");
      }
    }
  },

  logout: async (navigate) => {
    set({ isCheckingAuth: true });
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");

      set({
        authUser: null,
        isCheckingAuth: false,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");

      set({
        authUser: null,
        isCheckingAuth: false,
      });

      if (error.response) {
        toast.error(error.response.data?.message || "Failed to logout");
      }
    }
  },
}));
