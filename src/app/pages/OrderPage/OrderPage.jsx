import React, { useEffect } from "react";
import styles from "./OrderPage.module.scss";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/", { replace: true });
        }, 15000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={styles.main}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/6325/6325797.png"
                alt="success"
            />
            <h1>Ваш заказ успешно принят!!!</h1>
            <h3>С вами свяжутся с помощью данных указанных в вашем профиле.</h3>
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
