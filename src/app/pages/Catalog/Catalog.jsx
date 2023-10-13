import React, { useState } from "react";
import styles from "./Catalog.module.scss";
import FilterByCategory from "../../components/common/FilterByCategory/FilterByCategory";
import SortItems from "../../components/common/SortItems/SortItems";
import CardsItem from "../../components/common/CardsItem/CardsItem";
import Pagination from "../../components/ui/Pagination/Pagination";
import { paginate } from "../../utils/paginate";
import { useSelector } from "react-redux";
import { getCategories, getItems } from "../../store/products";

const Catalog = () => {
    const items = useSelector(getItems());
    const categories = useSelector(getCategories());

    const [currentCategories, setCurrentCategories] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const [sortOrder, setSortOrder] = useState("");

    if (!categories || !items) return "wait";

    const pageSize = 6;
    const categoriesReverse = [...categories, ...["All"]].reverse();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSelectCategory = (category) => {
        if (category === "All") {
            setCurrentCategories();
        } else {
            setCurrentCategories(category);
        }
        setCurrentPage(1);
    };

    const handleSortItems = (item) => {
        if (item === "") {
            setSortOrder("");
        } else {
            setSortOrder((prev) => (prev === item ? "down" : "up"));
        }
    };

    const filteredItems = currentCategories
        ? items.filter((item) => {
              return item.category === currentCategories;
          })
        : items;

    const sortedUsers = [...filteredItems].sort((a, b) => {
        if (sortOrder === "up") {
            return a.price - b.price;
        } else if (sortOrder === "down") {
            return b.price - a.price;
        } else {
            return filteredItems;
        }
    });

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        <div className={styles.catalog}>
            <FilterByCategory
                currentCategories={currentCategories}
                categories={categoriesReverse}
                handleSelectCategory={handleSelectCategory}
            />
            <SortItems sortOrder={sortOrder} onSort={handleSortItems} />
            <CardsItem items={userCrop} />
            <Pagination
                itemsCount={filteredItems.length}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
            />
        </div>
    );
};

export default Catalog;
