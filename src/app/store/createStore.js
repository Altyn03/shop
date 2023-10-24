import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import userReducer from "./user";

const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
