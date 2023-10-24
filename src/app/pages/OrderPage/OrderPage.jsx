import React, { useEffect } from "react";
import styles from "./OrderPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/user";

const OrderPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(getCurrentUser());

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate(`/users/${currentUser.id}`, { replace: true });
        }, 9000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={styles.main}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/6325/6325797.png"
                alt="success"
            />
            <h1>Ваш заказ успешно принят!!!</h1>
            <h3>С вами свяжутся с помощью данных указанны при регистрации.</h3>
            <h5>Дата заказа: {new Date().toLocaleDateString()}</h5>
            <h5>Номер заказа можете посмотреть в профиле.</h5>
            <h5>
                Спасибо за заказ!!!
                <img
                    src="https://colate.ru/wp-content/uploads/33066-solnyshko-v-ochkah.jpg"
                    alt="smile"
                />
            </h5>
            <h5>Сейчас вас автоматически перекинет в ваш профиль.</h5>
        </div>
    );
};

export default OrderPage;
