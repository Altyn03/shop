import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";
import { useProducts } from "./useProducts";

const OrderContext = React.createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const { currentUser } = useAuth();
    const { items } = useProducts();
    if (!currentUser) return null;

    function addItemInCart(id, event) {
        setCart((prev) => [
            ...prev,
            items.find((item) => item.id === Number(id))
        ]);
        event.preventDefault();
    }

    function deleteItemFromCart(id) {
        setCart((prev) => prev.filter((item) => item.id !== Number(id)));
    }

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    return (
        <OrderContext.Provider
            value={{ cart, addItemInCart, deleteItemFromCart }}
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
