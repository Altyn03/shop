import React, { useState } from "react";
import styles from "./OrderItem.module.scss";
import PropTypes from "prop-types";
import { useOrder } from "../../../hooks/useOrder";

const OrderItem = ({ item }) => {
    const [amount, setAmount] = useState(1);
    const { deleteItemFromCart } = useOrder();
    // const { cart } = useOrder();

    const incrementAmount = () => {
        setAmount((prev) => prev + 1);
    };

    const decrementAmount = () => {
        setAmount((prev) => prev - 1);
    };

    return (
        <div className={styles.item}>
            <img src={item.image} alt="item" />
            <div>
                <h5>{item.title}</h5>
                <button
                    className="btn btn-primary"
                    onClick={() => deleteItemFromCart(item.id)}
                >
                    Удалить
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => incrementAmount()}
                >
                    +
                </button>
                <div className={styles.quantity}>{amount}</div>
                <button
                    className="btn btn-primary"
                    onClick={() => decrementAmount()}
                    disabled={amount === 1}
                >
                    -
                </button>
            </div>
            <p>{item.price} $</p>
        </div>
    );
};

OrderItem.propTypes = {
    item: PropTypes.object
};

export default OrderItem;
