import React, { useEffect, useState } from "react";
import TextField from "../Fields/TextField/TextField";
import CheckBoxField from "../Fields/CheckBoxField/CheckBoxField";
import styles from "./LoginForm.module.scss";
import useForm from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, getIsLoggedIn, logIn } from "../../../store/user";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(getAuthErrors());
    const isLogged = useSelector(getIsLoggedIn());

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    const { handleChange, validate, errors, isValid } = useForm(
        data,
        setData,
        validatorConfig
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(logIn(data));
    };

    useEffect(() => {
        if (isLogged) {
            navigate("/catalog");
        }
    }, [navigate, isLogged]);

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={!isValid}>
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
