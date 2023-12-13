import axios from "axios";
import { toast } from "react-toastify";
import config from "./config.json";

const http = axios.create({
    baseURL: config.ProductsServerAPIEndpoint
});

http.interceptors.response.use(
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

const productsService = {
    getAllProducts: async () => {
        const { data } = await http.get();
        return data;
    },

    getCategories: async () => {
        const { data } = await http.get("categories/");
        return data;
    }
};

export default productsService;
