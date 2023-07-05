import React, { useState } from "react";
import TextField from "../Fields/TextField/TextField";
import CheckBoxField from "../Fields/CheckBoxField/CheckBoxField";
import styles from "./LoginForm.module.scss";
import useForm from "../../../hooks/useForm";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

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

    const { handleChange, handleSubmit, errors, isValid } = useForm(
        data,
        setData,
        validatorConfig
    );

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
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
            <button type="submit" disabled={!isValid}>
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
