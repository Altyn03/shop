import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user";
import { Navigate } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);

    return <Navigate to="/" replace />;
};

export default LogOut;
