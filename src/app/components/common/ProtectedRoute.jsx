import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/loginPage" replace />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    element: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
