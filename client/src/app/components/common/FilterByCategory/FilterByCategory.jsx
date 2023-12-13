import React from "react";
import PropTypes from "prop-types";
import styles from "./FilterByCategory.module.scss";

const FilterByCategory = ({
    currentCategories,
    categories,
    handleSelectCategory
}) => {
    return (
        <nav className={styles.navFilter}>
            <ul>
                {categories.map((category) => (
                    <li
                        key={category}
                        className={
                            currentCategories === category ? styles.active : ""
                        }
                        onClick={() => handleSelectCategory(category)}
                    >
                        {category[0].toUpperCase() +
                            category.split("").slice(1).join("")}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

FilterByCategory.propTypes = {
    currentCategories: PropTypes.string,
    categories: PropTypes.array.isRequired,
    handleSelectCategory: PropTypes.func
};

export default FilterByCategory;
