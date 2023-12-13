import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { orderService } from "../services/Firebase.service";
import { toast } from "react-toastify";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        cart: [],
        orders: [],
        isLoading: false,
        error: null
    },
    reducers: {
        addItemToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        deleteItemFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== Number(action.payload)
            );
        },
        setCartItemQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            state.cart = state.cart.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity };
                }
                return item;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.isLoading = false;
                state.cart = [];
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getOrders.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    }
});

const { reducer: orderReducer, actions } = orderSlice;
export const { addItemToCart, deleteItemFromCart, setCartItemQuantity } =
    actions;

export const addItemInCart = (id, event) => {
    return function (dispatch, getState) {
        event.preventDefault();
        const { products, order } = getState();
        if (order.cart.some((item) => item.id === Number(id))) {
            return toast("Вы уже добавили этот товар в корзину!!!");
        }

        const itemToAdd = products.items.find((item) => item.id === Number(id));
        dispatch(addItemToCart(itemToAdd));
    };
};

export const getOrders = createAsyncThunk(
    "order/getOrders",
    async (id, { rejectWithValue }) => {
        try {
            const orders = await orderService.getOrder(id);
            return Object.values(orders);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (payload, { getState, rejectWithValue }) => {
        const orderId = nanoid();
        const { order, user } = getState();

        const productsCart = order.cart.map((item) => {
            const newItem = {
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            };
            return newItem;
        });

        const price = order.cart?.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
        );

        try {
            await orderService.createOrder(orderId, {
                orderID: orderId,
                userID: user.entities.id,
                created_at: Date.now(),
                priceOrder: price,
                products: productsCart
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getOrdersUser = () => (state) => state.order.orders;
export const getOrderCart = () => (state) => state.order.cart;
export const getIsLoading = () => (state) => state.order.isLoading;
export const getOrderError = () => (state) => state.order.error;

export default orderReducer;
