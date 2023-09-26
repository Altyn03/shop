import React, { useEffect, useState } from "react";
import styles from "./UserProfilePage.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { orderService } from "../../services/Firebase.service";
import OrderHistoryItem from "../../components/ui/OrderHistoryItem/OrderHistoryItem";

const UserProfilePage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [orders, setOrders] = useState([]);
    const { currentUser, updateUserData } = useAuth();

    const handleChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserData(currentUser.id, {
                ...currentUser,
                image: imageUrl
            });
        } catch (error) {
            console.error(error);
        } finally {
            setImageUrl("");
        }
    };

    async function getOrder(userId) {
        try {
            const order = await orderService.getOrder(userId);
            setOrders(Object.values(order));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOrder(currentUser.id);
    }, []);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    return (
        <div className={styles.main}>
            <div className={`${styles.profile} ${styles.profile_info}`}>
                <img src={currentUser.image} alt="profile" />
                <h2>{currentUser.name}</h2>
                <h4>@{currentUser.telegram}</h4>
                <h6>
                    Дата регистрации:{" "}
                    {new Date(currentUser.created_at).toLocaleDateString()}
                </h6>
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
                    {orders.map((order) => (
                        <OrderHistoryItem key={order.orderID} order={order} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfilePage;
