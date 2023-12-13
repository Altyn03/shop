import React, { useEffect, useState } from "react";
import styles from "./OrderItem.module.scss";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteItemFromCart, setCartItemQuantity } from "../../../store/order";

const OrderItem = ({ item }) => {
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCartItemQuantity({ itemId: item.id, quantity: amount }));
    }, [amount]);

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
                    style={{ marginRight: 14 }}
                    className="btn btn-primary"
                    onClick={() => dispatch(deleteItemFromCart(item.id))}
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
            <p>{(item.price * item.quantity).toFixed(2)} $</p>
        </div>
    );
};

OrderItem.propTypes = {
    item: PropTypes.object
};

export default OrderItem;
