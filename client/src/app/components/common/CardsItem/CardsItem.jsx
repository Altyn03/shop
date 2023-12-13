import React from "react";
import styles from "./CardsItem.module.scss";
import PropTypes from "prop-types";
import CardItem from "../../ui/CardItem/CardItem";

const CardsItem = ({ items }) => {
    return (
        <div className={styles.container}>
            {items.map((item) => (
                <CardItem {...item} key={item.id} />
            ))}
        </div>
    );
};

CardsItem.propTypes = {
    items: PropTypes.array
};

export default CardsItem;
