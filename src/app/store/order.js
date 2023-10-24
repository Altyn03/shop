// import { createSlice } from "@reduxjs/toolkit";
// import { orderService } from "../services/Firebase.service";
// import { toast } from "react-toastify";

// const orderSlice = createSlice({
//     name: "order",
//     initialState: {
//         cart: null,
//         isLoading: true,
//         error: null
//     },
//     reducers: {
//         orderRequested: (state) => {
//             state.isLoading = true;
//         },
//         orderReceived: (state, action) => {
//             state.items = action.payload;
//             state.isLoading = false;
//         },
//         orderRequestFiled: (state, action) => {
//             state.error = action.payload;
//             state.isLoading = false;
//         }
//     }
// });

// const { reducer: orderReducer, actions } = orderSlice;
// const { ordersRequested, ordersReceived, ordersRequestFiled } = actions;

// const price =
//     cart && cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

// export const createOrder = () => async (dispatch, getState) => {
//     dispatch(ordersRequested());
//     try {
//         const items = await orderService.createOrder();
//         dispatch(ordersReceived(items));
//     } catch (error) {
//         dispatch(ordersRequestFiled(error.message));
//     }
// };

// export const getPrice = () => {
//     return price;
// };

// const productsCart = cart.map((item) => {
//     const newItem = {
//         id: item.id,
//         title: item.title,
//         price: item.price,
//         image: item.image,
//         quantity: item.quantity
//     };
//     return newItem;
// });

// export const addItemInCart = (id, event) => (state) => {
//     event.preventDefault();
//     if (state.order.cart.some((item) => item.id === Number(id))) {
//         return toast("Вы уже добавили этот товар в корзину!!!");
//     }
//     state.order.cart = [];
//     setCart((prev) => [...prev, items.find((item) => item.id === Number(id))]);
// };

// export default orderReducer;
