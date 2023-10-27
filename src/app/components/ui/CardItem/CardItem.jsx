import React from "react";
import styles from "./CardItem.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../store/user";
import { addItemInCart } from "../../../store/order";

const CardItem = ({ image, price, title, rating, id }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    return (
        <Link to={`${id}`} className={styles.item}>
            <img src={image} alt="sneakers" className={styles.img} />
            <h1>{title}</h1>
            <h2>{price} $</h2>
            <h3>Rating: {rating.rate}</h3>
            <div className={styles.item__button}>
                <button className={styles.item__button_item}>
                    Больше фото
                </button>
                <button
                    className={styles.item__button_item}
                    onClickCapture={(event) =>
                        currentUser && dispatch(addItemInCart(id, event))
                    }
                >
                    Купить
                </button>
            </div>
        </Link>
    );
};

CardItem.propTypes = {
    rating: PropTypes.object,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number
};

export default CardItem;
