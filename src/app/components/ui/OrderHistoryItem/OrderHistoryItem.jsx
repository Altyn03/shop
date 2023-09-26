import React from "react";
import PropTypes from "prop-types";
import styles from "./OrderHistoryItem.module.scss";
import { displayDate } from "../../../utils/displayDate";

const OrderHistoryItem = ({ order }) => {
    return (
        <div className={styles.order}>
            <h5>Заказ № {order.orderID}</h5>
            <h6>Заказ был оформлен {displayDate(order.created_at)}.</h6>
            {order.products.map((item) => (
                <div className={styles.order_item} key={item.title}>
                    <img src={item.image} alt="item" />
                    <div>{item.title}</div>
                    <div>{item.quantity} шт.</div>
                    <div>{item.price} $</div>
                </div>
            ))}
            <p>Стоимость заказа: {order.priceOrder.toFixed(2)} $</p>
        </div>
    );
};

OrderHistoryItem.propTypes = {
    order: PropTypes.object
};

export default OrderHistoryItem;
