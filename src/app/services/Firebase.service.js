import axios from "axios";
import { toast } from "react-toastify";
import localStorageService from "./localStorage.service";
import { httpAuth } from "../hooks/useAuth";
import config from "./config.json";

const httpFirebase = axios.create({
    baseURL: config.FirebaseServerAPIEndpoint
});

httpFirebase.interceptors.request.use(
    async function (config) {
        const containSlash = /\/$/gi.test(config.url);
        config.url =
            (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

        const expiresDate = localStorageService.getTokenExpireDate();
        const refreshToken = localStorageService.getRefreshToken();

        if (refreshToken && expiresDate < Date.now()) {
            const { data } = await httpAuth.post("token", {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            });

            localStorageService.setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                expiresIn: data.expires_in,
                localId: data.user_id
            });
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.params = { ...config.params, auth: accessToken };
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

httpFirebase.interceptors.response.use(
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
    get: async () => {
        const { data } = await httpFirebase.get("users/");
        return data;
    },
    create: async (payload) => {
        const { data } = await httpFirebase.put("users/" + payload.id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpFirebase.get(
            "users/" + localStorageService.getUserID()
        );
        return data;
    },
    updateCurrentUser: async (id, content) => {
        const { data } = await httpFirebase.patch("users/" + id, content);
        return data;
    }
};

export const productsServiceFirebase = {
    getItem: async (id) => {
        const { data } = await httpFirebase.get("products/" + id);
        return data;
    },

    getAllProducts: async () => {
        const { data } = await httpFirebase.get("products/");
        return data;
    },

    update: async (id, content) => {
        const { data } = await httpFirebase.put("products/" + id, content);
        return data;
    },

    delete: async (id) => {
        const { data } = await httpFirebase.delete("products/" + id);
        return data;
    }
};

export const orderService = {
    getOrder: async (id) => {
        const { data } = await httpFirebase.get("orders/" + id);
        return data;
    },
    createOrder: async (id, content) => {
        const { data } = await httpFirebase.put("orders/" + id, content);
        return data;
    }
};
