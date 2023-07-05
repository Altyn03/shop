import React, { useState } from "react";
import TextField from "../Fields/TextField/TextField";
import RadioField from "../Fields/RadioField/RadioField";
import styles from "./RegisterForm.module.scss";
import useForm from "../../../hooks/useForm";
import CheckBoxField from "../Fields/CheckBoxField/CheckBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        sex: "male",
        licence: false
    });

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
        licence: {
            isRequired: {
                message:
                    "Обязательно прочтите и подтвердите лицензионное соглашение"
            }
        }
    };

    const { handleChange, handleSubmit, errors, isValid } = useForm(
        data,
        setData,
        validatorConfig
    );

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
