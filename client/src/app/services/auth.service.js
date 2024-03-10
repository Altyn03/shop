import axios from "axios";
import localStorageService from "./localStorage.service";
import { userService } from "./MyServer.service";
import config from "../services/config.json";

export const httpAuth = axios.create({
    baseURL: config.MyServerAPIEndpoint + "user/"
});

const authService = {
    register: async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post(`signUp/`, {
                email,
                password,
                image: `https://i.pravatar.cc/150?img=${Math.round(
                    Math.random() * 12
                )}`,
                ...rest
            });
            localStorageService.setTokens(data);
            return data.user ? data.user : new Error(data);
        } catch (error) {
            return error;
        }
    },
    logIn: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword/`, {
            email,
            password
        });
        localStorageService.setTokens(data);
        try {
            const content = await userService.getCurrentUser();
            return content;
        } catch (error) {
            return error;
        }
    },
    refreshToken: async () => {
        const { data } = await httpAuth.post("refreshToken/", {
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
