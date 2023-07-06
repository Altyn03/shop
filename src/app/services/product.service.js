import httpService from "./http.service";

const productsEndpoint = "products/";

const productsService = {
    get: async (id) => {
        const { data } = await httpService.get(productsEndpoint + id);
        return data;
    },

    getAllProducts: async () => {
        const { data } = await httpService.get(productsEndpoint);
        return data;
    },

    getCategories: async () => {
        const { data } = await httpService.get(
            productsEndpoint + "categories/"
        );
        return data;
    },

    update: async (id, content) => {
        const { data } = await httpService.put(productsEndpoint + id, content);
        return data;
    },

    delete: async (id) => {
        const { data } = await httpService.delete(productsEndpoint + id);
        return data;
    }
};

export default productsService;
