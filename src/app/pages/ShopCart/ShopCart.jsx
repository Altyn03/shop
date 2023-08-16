import React from "react";
import styles from "./ShopCart.module.scss";
import OrderItem from "../../components/ui/OrderItem/OrderItem";
const orderItems = [
    {
        id: 123,
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3
    }
];

const ShopCart = () => {
    return (
        <div className={styles.cart}>
            <h1>Корзина</h1>
            <div className={styles.cart_order}>
                <div className={styles.cart_order_items}>
                    <h3>Ваш заказ</h3>
                    <div className={styles.list_items}>
                        {orderItems.map((item) => (
                            <OrderItem {...item} key={item.id} />
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
