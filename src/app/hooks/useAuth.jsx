import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorage.service";

const AuthContext = React.createContext();

const httpAuth = axios.create();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    async function singUp({ email, password, ...rest }) {
        const key = "AIzaSyD2uCewRYOgZpRxM56-eR36B-lJDP6s1LY";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setTokens(data);
            await createUser({ id: data.localId, email, ...rest });
            console.log(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const content = await userService.create(data);
            setUser(content);
            console.log(content);
            console.log(currentUser);
        } catch (error) {
            setError(error);
        }
    }

    if (error) {
        toast.error(error);
    }

    return (
        <AuthContext.Provider value={{ singUp, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
