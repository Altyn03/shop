import React from "react";
import styles from "./OrderItem.module.scss";
import PropTypes from "prop-types";

const OrderItem = ({ image, title, price }) => {
    return (
        <div className={styles.item}>
            <img src={image} alt="item" />
            <div>
                <h5>{title}</h5>
                <button className="btn btn-primary">Удалить</button>
                <button className="btn btn-primary">+</button>
                <button className="btn btn-primary">1</button>
                <button className="btn btn-primary">-</button>
            </div>
            <p>{price} $</p>
        </div>
    );
};

OrderItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number
};

export default OrderItem;
