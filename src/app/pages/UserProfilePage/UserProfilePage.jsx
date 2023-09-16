import React, { useState } from "react";
import styles from "./UserProfilePage.module.scss";
import { useAuth } from "../../hooks/useAuth";

const UserProfilePage = () => {
    const [imageUrl, setImageUrl] = useState("");
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
                    <button type="submit">Сохранить</button>
                </form>
            </div>
            <div className={`${styles.profile} ${styles.profile_orderHistory}`}>
                История заказов
            </div>
        </div>
    );
};

export default UserProfilePage;
