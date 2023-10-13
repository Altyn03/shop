import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/http.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: null,
        categories: null,
        isLoading: true,
        error: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        categoriesReceived: (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFiled,
    categoriesReceived
} = actions;

export const loadProducts = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const items = await productsService.getAllProducts();
        const categories = await productsService.getCategories();
        dispatch(productsReceived(items));
        dispatch(categoriesReceived(categories));
    } catch (error) {
        dispatch(productsRequestFiled(error.message));
    }
};

export const getItems = () => (state) => state.products.items;
export const getCategories = () => (state) => state.products.categories;

export default productsReducer;
