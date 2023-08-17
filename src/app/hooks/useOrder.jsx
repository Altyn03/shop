import React, { useContext } from "react";
import PropTypes from "prop-types";

const OrderContext = React.createContext();

export const useOrder = () => {
    useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    return (
        <OrderContext.Provider value={"qwe"}>{children}</OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
