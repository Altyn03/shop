import React from "react";
import styles from "./ShopCart.module.scss";
import OrderItem from "../../components/ui/OrderItem/OrderItem";
import { useOrder } from "../../hooks/useOrder";

const ShopCart = () => {
    const { cart, price, createOrder } = useOrder();
    const discount = 0;
    const totalPrice = price - discount;

    return (
        <div className={styles.cart}>
            <h1>Корзина</h1>
            {cart.length ? (
                <div className={styles.cart_order}>
                    <div className={styles.cart_order_items}>
                        <h3>Ваш заказ</h3>
                        <div className={styles.list_items}>
                            {cart.map((item) => (
                                <OrderItem item={item} key={item.id} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.cart_order_sum}>
                        <h3>Сумма заказа</h3>
                        <div className={styles.sum_div}>
                            <span>Стоимость</span>
                            <span>{price.toFixed(2)} $</span>
                        </div>
                        <div className={styles.sum_div}>
                            <span>Скидка</span>
                            <span>{discount.toFixed(2)} $</span>
                        </div>
                        <div
                            className={styles.sum_div}
                            style={{ marginBottom: 20 }}
                        >
                            <span>Итоговая стоимость</span>
                            <span>{totalPrice.toFixed(2)} $</span>
                        </div>
                        {cart.length !== 0 && (
                            <button onClick={() => createOrder()}>
                                Оформить заказ
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <h4 className={styles.zero}>
                    Упс!
                    <br />
                    <i className={`fa-regular fa-face-frown ${styles.sad}`}></i>
                    <br />
                    Кажется вы не добавили товаров в корзину.
                </h4>
            )}
        </div>
    );
};

export default ShopCart;
