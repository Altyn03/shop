import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { userService } from "../services/Firebase.service";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorage.service";
import Loader from "../components/ui/Loader/Loader";

const AuthContext = React.createContext();

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    async function singUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setTokens(data);
            await createUser({ id: data.localId, email, ...rest });
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                } else {
                    const errorObject = {
                        email: "Другая ошибка"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function singIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            localStorageService.setTokens(data);
            getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                const errorObject = {
                    email: "Пароль или email введены не правильно"
                };
                throw errorObject;
            }
        } finally {
            setLoading(false);
        }
    }

    async function createUser(data) {
        try {
            const user = await userService.create(data);
            setUser(user);
        } catch (error) {
            setError(error);
        }
    }

    async function getUserData() {
        try {
            const content = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ singUp, singIn, currentUser }}>
            {!isLoading ? children : <Loader />}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
