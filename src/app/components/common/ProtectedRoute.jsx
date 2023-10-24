import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return isLoggedIn ? element : <Navigate to="/loginPage" replace />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    element: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
