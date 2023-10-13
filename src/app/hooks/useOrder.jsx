import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { orderService } from "../services/Firebase.service";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItems } from "../store/products";

const OrderContext = React.createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const items = useSelector(getItems());
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const price =
        cart && cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const productsCart = cart.map((item) => {
        const newItem = {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        };
        return newItem;
    });

    function addItemInCart(id, event) {
        event.preventDefault();
        if (cart.some((item) => item.id === Number(id))) {
            return toast("Вы уже добавили этот товар в корзину!!!");
        }
        setCart((prev) => [
            ...prev,
            items.find((item) => item.id === Number(id))
        ]);
    }

    function deleteItemFromCart(id) {
        setCart((prev) => prev.filter((item) => item.id !== Number(id)));
    }

    async function createOrder() {
        try {
            const orderID = nanoid();
            await orderService.createOrder(orderID, {
                orderID: orderID,
                userID: currentUser.id,
                created_at: Date.now(),
                priceOrder: price,
                products: productsCart
            });
        } catch (error) {
            setError(error);
        } finally {
            setCart([]);
            navigate("/orderPage", { replace: true });
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <OrderContext.Provider
            value={{
                cart,
                setCart,
                addItemInCart,
                deleteItemFromCart,
                createOrder,

                price
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
