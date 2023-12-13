import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import LoginForm from "../../components/ui/LoginForm/LoginForm";
import RegisterForm from "../../components/ui/RegisterForm/RegisterForm";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";

const LoginPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const isLogged = useSelector(getIsLoggedIn());
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    if (isLogged) {
        navigate("/catalog");
    }

    return (
        <div className={styles.loginPage}>
            {formType === "register" ? (
                <div className={styles.loginPage__form}>
                    <h1>Регистрация</h1>
                    <RegisterForm />
                    <p>
                        У вас уже есть аккаунт?
                        <a onClick={toggleFormType}> Войти</a>
                    </p>
                </div>
            ) : (
                <div className={styles.loginPage__form}>
                    <h1>Вход</h1>
                    <LoginForm />
                    <p>
                        У вас еще нет аккаунта?
                        <a onClick={toggleFormType}> Зарегистрироваться</a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
