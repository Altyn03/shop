import axios from "axios";
import { toast } from "react-toastify";

const httpAuth = axios.create({
    baseURL:
        "https://shop-9cf94-default-rtdb.europe-west1.firebasedatabase.app/users/"
});

httpAuth.interceptors.request.use(
    function (config) {
        const containSlash = /\/$/gi.test(config.url);
        config.url =
            (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

httpAuth.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            // logger.log(error);
            toast.error("Somthing was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);

const userService = {
    get: async () => {
        const { data } = await httpAuth.get();
        return data;
    },
    create: async (payload) => {
        const { data } = await httpAuth.put(payload.id, payload);
        return data;
    }
};

export default userService;
