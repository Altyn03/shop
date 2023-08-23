import React from "react";
import styles from "./ShopCart.module.scss";
import OrderItem from "../../components/ui/OrderItem/OrderItem";
import { useOrder } from "../../hooks/useOrder";

const ShopCart = () => {
    const { cart } = useOrder();
    return (
        <div className={styles.cart}>
            <h1>Корзина</h1>
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
                </div>
            </div>
        </div>
    );
};

export default ShopCart;
