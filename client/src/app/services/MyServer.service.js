import axios from "axios";
import { toast } from "react-toastify";
import localStorageService from "./localStorage.service";
import config from "./config.json";
import authService from "./auth.service";

const httpServer = axios.create({
    baseURL: config.MyServerAPIEndpoint
});

httpServer.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpireDate();
        const refreshToken = localStorageService.getRefreshToken();

        if (refreshToken && expiresDate < Date.now()) {
            const data = await authService.refreshToken();
            localStorageService.setTokens(data);
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.params,
                Authorization: `Bearer ${accessToken}`
            };
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

httpServer.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            // logger.log(error);
            toast.error("Сервер не отвечает");
        }
        return Promise.reject(error);
    }
);

export const userService = {
    getCurrentUser: async () => {
        const { data } = await httpServer.get(
            "user/" + localStorageService.getUserID()
        );
        return data.user;
    },
    updateCurrentUser: async (content) => {
        const { data } = await httpServer.patch(
            "user/updateUser/" + localStorageService.getUserID(),
            content
        );
        return data;
    }
};

export const orderService = {
    getOrder: async (id) => {
        const { data } = await httpServer.get("order/getUserOrders/" + id);
        return data;
    },
    createOrder: async (content) => {
        const { data } = await httpServer.post("order/createOrder/", content);
        return data;
    }
};

export const productsService = {
    getAllProducts: async () => {
        const { data } = await httpServer.get("products/getAllProducts/");
        return data;
    }
};
