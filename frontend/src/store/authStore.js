import {create} from 'zustand';
import axios from 'axios';
//import { checkAuth } from '../../../backend/controllers/auth.controllers';


const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

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

    // checkAuthAuth:async()=>{
    //     set({isCheckingAuth:true,error:null});
    //     try{
    //         const response= await axios.get(`${API.URL}/CHECK-AUTH`);
    //         set({user:response.data.user, isAuthenticated:true, isCheckingAuth:false});
    //     }catch(error){
    //          set({error:null, isCheckingAuth:false});   
    //     }
    // }

}))