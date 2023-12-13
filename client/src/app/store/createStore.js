import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import userReducer from "./user";
import orderReducer from "./order";

const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    order: orderReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
