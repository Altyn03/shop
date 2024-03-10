import React from "react";
import styles from "./ItemPage.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../store/products";
import { getCurrentUser } from "../../store/user";
import { addItemInCart } from "../../store/order";

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const items = useSelector(getItems());
    const currentUser = useSelector(getCurrentUser());
    const dispatch = useDispatch();

    const currentItem = items.find((item) => item.id === Number(id));

    window.scroll(0, 0);

    return (
        <main className={styles.item}>
            <div className={styles.item__img}>
                <img src={currentItem.image} alt="вещь" />
            </div>
            <div className={styles.item__info}>
                <h1>{currentItem.title}</h1>
                <h4>{currentItem.category}</h4>
                <h3>{currentItem.description}</h3>
                <div className={styles.item__info__rating}>
                    <h3>
                        Оценка: {currentItem.rating.rate}
                        <i className="fa-solid fa-star"></i>
                    </h3>
                    <h3>Количество оценок: {currentItem.rating.count}</h3>
                </div>
                <h2>{currentItem.price} $</h2>
                <button
                    onClick={(event) => {
                        !currentUser
                            ? toast.error(
                                  "Выполните вход в профиль или зарегистрируйтесь!"
                              )
                            : dispatch(addItemInCart(id, event));
                    }}
                >
                    Добавить в корзину
                </button>
                <div className={styles.item__info__order}>
                    <h4>
                        <b>
                            Есть вопросы по товару? Наш онлайн-консультант с
                            радостью ответит и поможет вам
                        </b>{" "}
                        <a href="#">здесь.</a>
                    </h4>
                    <h4>
                        <b>Процесс покупки и условия доставки:</b>
                    </h4>
                    <h4>
                        <b>Доставка бесплатная,</b> ведь PoizonShop любит тебя!
                    </h4>
                    <h4>1. Выбери товар из каталога и подбери свой размер.</h4>
                    <h4>2. Добавь нужные товары в корзину.</h4>
                    <h4>3. Далее перейди к оплате.</h4>
                    <h4>
                        4. После мы свяжемся с тобой для подтверждения и
                        уточнения деталей.
                    </h4>
                    <h4>
                        5. Доставка производится через СДЭК или Почтой России.
                    </h4>
                    <h4>
                        <b>Хороших покупок! Твой PoizonShop.</b>
                    </h4>
                    <h4>
                        <b>P.S. и да, это оригинал!</b>
                    </h4>
                </div>
            </div>
            <div
                className={styles.item__navigate}
                onClick={() => navigate("/catalog")}
            >
                / Каталог
            </div>
        </main>
    );
};

export default ItemPage;
