import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    loginError: null,


    initializeAuth: () => {
        const token = localStorage.getItem('access');
        if (token) {
            set({ accessToken: token });
        }
    },

    login: async (credentials) => {
        try {
            const response = await axiosInstance.post("/auth/admin-login", credentials);
            const { user, accessToken, refreshToken } = response.data;
            set({ user, accessToken, refreshToken, loginError: null });
            localStorage.setItem('access', accessToken);
            localStorage.setItem('refresh', refreshToken);

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid credentials or login failed";
            set({ loginError: errorMessage });
            return { success: false, error: errorMessage };
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post("/register", userData);
            const { user, accessToken, refreshToken } = response.data;
            set({ user, accessToken, refreshToken });
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed";
            return { success: false, error: errorMessage };
        }
    },

    logout: () => {
        try {
            set({ user: null, accessToken: null, refreshToken: null });
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    refreshAccessToken: async () => {
        const { refreshToken } = get();
        try {
            const response = await axiosInstance.post("https://your-api.com/api/refresh-token", {
                refreshToken,
            });

            const { accessToken } = response.data;
            set({ accessToken });
            return { success: true };
        } catch (error) {
            set({ user: null, accessToken: null, refreshToken: null });
            return {
                success: false,
                error: error.response?.data?.message || "Token refresh failed",
            };
        }
    },
}));

export default useAuthStore;
