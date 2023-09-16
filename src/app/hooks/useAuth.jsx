import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { userService } from "../services/Firebase.service";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorage.service";
import Loader from "../components/ui/Loader/Loader";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    async function singUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setTokens(data);
            await createUser({
                id: data.localId,
                email,
                image: `https://i.pravatar.cc/150?img=${Math.round(
                    Math.random() * 12
                )}`,
                created_at: Date.now(),
                ...rest
            });
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

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        navigate("/", { replace: true });
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

    async function updateUserData(id, content) {
        try {
            const data = await userService.updateCurrentUser(id, content);
            setUser(data);
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
        <AuthContext.Provider
            value={{ singUp, singIn, currentUser, logOut, updateUserData }}
        >
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
