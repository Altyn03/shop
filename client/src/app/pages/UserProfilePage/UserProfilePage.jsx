import React, { useState, useEffect } from "react";
import styles from "./UserProfilePage.module.scss";
import OrderHistoryItem from "../../components/ui/OrderHistoryItem/OrderHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateUserData } from "../../store/user";
import { getOrders, getOrdersUser } from "../../store/order";

const UserProfilePage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const currentUser = useSelector(getCurrentUser());
    const dispatch = useDispatch();
    const orders = useSelector(getOrdersUser());

    const handleChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleSubmit = () => {
        try {
            dispatch(updateUserData(imageUrl));
        } finally {
            setImageUrl("");
        }
    };

    useEffect(() => {
        dispatch(getOrders(currentUser.id));
    }, []);

    const sortDateOrders = [...orders].sort(
        (order1, order2) => order2.created_at - order1.created_at
    );

    return (
        <div className={styles.main}>
            <div className={`${styles.profile} ${styles.profile_info}`}>
                <img src={currentUser.image} alt="profile" />
                <h2>{currentUser.name}</h2>
                <h4>@{currentUser.telegram}</h4>
                <h6>Дата регистрации: {currentUser.createdAt}</h6>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="image">
                        Если вы хотите изменить аватар вашего профиля вставьте
                        URL ссылку на нужное вам изображение и сохраните
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="URL-ссылка"
                        name="image"
                        value={imageUrl}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit" disabled={imageUrl.length === 0}>
                        Сохранить
                    </button>
                </form>
            </div>
            <div className={`${styles.profile} ${styles.profile_orderHistory}`}>
                <h2>История заказов</h2>
                <ul className={styles.profile_orderHistory_container}>
                    {sortDateOrders.map((order) => (
                        <OrderHistoryItem key={order.id} order={order} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfilePage;
