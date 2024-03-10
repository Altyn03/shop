import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsService } from "../services/MyServer.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
                state.lastFetch = Date.now();
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    }
});

const { reducer: productsReducer } = productsSlice;

const isOutDated = (date) => Date.now() - date > 300000;

export const loadProducts = createAsyncThunk(
    "products",
    async (payload, { getState, rejectWithValue }) => {
        const { lastFetch } = getState().products;
        if (isOutDated(lastFetch)) {
            try {
                const data = await productsService.getAllProducts();
                return data;
            } catch (error) {
                rejectWithValue(error.message);
            }
        }
    }
);

export const getItems = () => (state) => state.products.items;

export default productsReducer;
