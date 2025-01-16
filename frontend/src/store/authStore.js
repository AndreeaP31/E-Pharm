import {create} from 'zustand';
import axios from 'axios';
//import { checkAuth } from '../../../backend/controllers/auth.controllers';


const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";
const COURIER_API_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/courier"
    : "/api/courier";

const PHARMACY_API_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/pharmacy"
    : "/api/pharmacy";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

    fetchPharmacies: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${PHARMACY_API_URL}`);
            set({ pharmacies: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching pharmacies", isLoading: false });
            throw error;
        }
    },

    // Adaugă o farmacie nouă
    addPharmacy: async (name, address, phoneNumber, email, openHours) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${PHARMACY_API_URL}/add`, {
                name,
                address,
                phoneNumber,
                email,
                openHours,
            });
            set({ message: "Pharmacy added successfully", isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error adding pharmacy", isLoading: false });
            throw error;
        }
    },

	signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error signing up",
                isLoading: false,
            });
            throw error; // Aruncăm eroarea pentru debugging în frontend
        }
    },

    checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
    
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},
    signupCourier: async (email, password, name, phoneNumber, pharmacyName) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${COURIER_API_URL}/signup`, { email, password, name, phoneNumber, pharmacyName });
            set({ user: response.data.courier, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error signing up courier",
                isLoading: false,
            });
            throw error;
        }
    },

    loginCourier: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${COURIER_API_URL}/login`, { email, password });
            set({ user: response.data.courier, isAuthenticated: true, error: null, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in courier", isLoading: false });
            throw error;
        }
    },

}))