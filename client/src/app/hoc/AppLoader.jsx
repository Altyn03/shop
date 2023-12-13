import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getUserData } from "../store/user";
import { loadProducts } from "../store/products";
import localStorageService from "../services/localStorage.service";
import { getOrders } from "../store/order";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            dispatch(getUserData());
            dispatch(getOrders(localStorageService.getUserID()));
        }
        dispatch(loadProducts());
    }, []);

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
