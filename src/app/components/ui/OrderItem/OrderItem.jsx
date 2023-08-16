import React from "react";
import styles from "./OrderItem.module.scss";
import PropTypes from "prop-types";

const OrderItem = ({ image, title, price }) => {
    return (
        <div className={styles.item}>
            <img src={image} alt="item" />
            <h5>{title}</h5>
            <p>{price}</p>
        </div>
    );
};

OrderItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number
};

export default OrderItem;
