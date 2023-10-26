import React, { useState } from "react";
import TextField from "../Fields/TextField/TextField";
import RadioField from "../Fields/RadioField/RadioField";
import styles from "./RegisterForm.module.scss";
import useForm from "../../../hooks/useForm";
import CheckBoxField from "../Fields/CheckBoxField/CheckBoxField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../../store/user";

const RegisterForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        telegram: "",
        sex: "male",
        licence: false
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле с именем обязательно для заполнения"
            }
        },
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
        },
        telegram: {
            isRequired: {
                message:
                    "Telegram обязателен для заполнения, можете написать свой номер телефона"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Обязательно прочтите и подтвердите лицензионное соглашение"
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
        dispatch(register(data));
        navigate("/catalog");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.registerForm}>
            <TextField
                label="Ваше полное имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
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
            <TextField
                label="Ваш Telegram"
                name="telegram"
                value={data.telegram}
                onChange={handleChange}
                error={errors.telegram}
            />
            <RadioField
                options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" },
                    { name: "Другое", value: "other" }
                ]}
                label="Пол"
                name="sex"
                value={data.sex}
                onChange={handleChange}
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a href="#">лицензионное соглашение</a>
            </CheckBoxField>
            <button type="submit" disabled={!isValid}>
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterForm;
