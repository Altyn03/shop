import React, { useState, useEffect } from "react";
import styles from "./ItemPage.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import { productsServiceFirebase } from "../../services/Firebase.service";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const [item, setItem] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchItem();
    }, []);

    async function fetchItem() {
        try {
            const data = await productsServiceFirebase.getItem(id);
            setItem(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    window.scroll(0, 0);

    return (
        <div>
            {isLoading ? (
                <div className={styles.view}>
                    <Loader />
                </div>
            ) : (
                <main className={styles.item}>
                    <div className={styles.item__img}>
                        <img src={item.image} alt="вещь" />
                    </div>
                    <div className={styles.item__info}>
                        <h1>{item.title}</h1>
                        <h4>{item.category}</h4>
                        <h3>{item.description}</h3>
                        <div className={styles.item__info__rating}>
                            <h3>
                                Оценка: {item.rating.rate}
                                <i className="fa-solid fa-star"></i>
                            </h3>
                            <h3>Количество оценок: {item.rating.count}</h3>
                        </div>
                        <h2>{item.price} $</h2>
                        <button
                            onClick={() => {
                                isAuth
                                    ? toast.error(
                                          "Выполните вход в профиль или зарегистрируйтесь!"
                                      )
                                    : toast("Пока все четко");
                            }}
                        >
                            Добавить в корзину
                        </button>
                        <div className={styles.item__info__order}>
                            <h4>
                                <b>
                                    Есть вопросы по товару? Наш
                                    онлайн-консультант с радостью ответит и
                                    поможет вам
                                </b>{" "}
                                <a href="#">здесь.</a>
                            </h4>
                            <h4>
                                <b>Процесс покупки и условия доставки:</b>
                            </h4>
                            <h4>
                                <b>Доставка бесплатная,</b> ведь PoizonShop
                                любит тебя!
                            </h4>
                            <h4>
                                1. Выбери товар из каталога и подбери свой
                                размер.
                            </h4>
                            <h4>2. Добавь нужные товары в корзину.</h4>
                            <h4>3. Далее перейди к оплате.</h4>
                            <h4>
                                4. После мы свяжемся с тобой для подтверждения и
                                уточнения деталей.
                            </h4>
                            <h4>
                                5. Доставка производится через СДЭК или Почтой
                                России.
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
            )}
        </div>
    );
};

export default ItemPage;
