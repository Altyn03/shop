import axios from "axios";
import localStorageService from "./localStorage.service";
import { userService } from "./Firebase.service";
import { toast } from "react-toastify";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password, ...rest }) => {
        const { data } = await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true
        });
        localStorageService.setTokens(data);
        try {
            const user = await userService.create({
                id: data.localId,
                email,
                image: `https://i.pravatar.cc/150?img=${Math.round(
                    Math.random() * 12
                )}`,
                created_at: Date.now(),
                ...rest
            });
            return user;
        } catch (error) {
            toast.error(error.message);
        }
    },
    logIn: async ({ email, password }) => {
        const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        });
        localStorageService.setTokens(data);
        try {
            const content = await userService.getCurrentUser();
            return content;
        } catch (error) {
            toast.error(error.message);
        }
    }
};

export default authService;
