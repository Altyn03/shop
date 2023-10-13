import React, { useState } from "react";
import styles from "./Catalog.module.scss";
import FilterByCategory from "../../components/common/FilterByCategory/FilterByCategory";
import SortItems from "../../components/common/SortItems/SortItems";
import CardsItem from "../../components/common/CardsItem/CardsItem";
import Pagination from "../../components/ui/Pagination/Pagination";
import { paginate } from "../../utils/paginate";
import { useProducts } from "../../hooks/useProducts";

const Catalog = () => {
    const { items, categories } = useProducts();

    const [currentCategories, setCurrentCategories] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const [sortOrder, setSortOrder] = useState("");

    const pageSize = 6;

    // useEffect(() => {
    //     fetch("https://fakestoreapi.com/products/")
    //         .then((res) => res.json())
    //         .then((json) => setItems(json));
    //     console.log(items);
    // }, []);

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

    const categoriesReverse = [...categories].reverse();

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
