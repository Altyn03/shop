import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.scss";
import FilterByCategory from "../../components/common/FilterByCategory/FilterByCategory";
import SortItems from "../../components/common/SortItems/SortItems";
import CardsItem from "../../components/common/CardsItem/CardsItem";
import Loader from "../../components/ui/Loader/Loader";
import Pagination from "../../components/ui/Pagination/Pagination";
import { paginate } from "../../utils/paginate";
import httpService from "../../services/http.service";

const Catalog = () => {
    const [items, setItems] = useState([]);

    const [categories, setCategoies] = useState([]);
    const [currentCategories, setCurrentCategoies] = useState();

    const [currentPage, setCurrentPage] = useState(1);

    const [sortOrder, setSortOrder] = useState("");

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const pageSize = 6;

    // useEffect(() => {
    //     fetch("https://fakestoreapi.com/products/")
    //         .then((res) => res.json())
    //         .then((json) => setItems(json));
    //     console.log(items);
    // }, []);

    async function fetchAllItems() {
        try {
            const { data } = await httpService.get("products/");
            setItems(data);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchAllCategories() {
        try {
            const { data } = await httpService.get("products/categories/");
            setCategoies([...data, ...["All"]]);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCategories();
        fetchAllItems();
    }, []);

    if (isError) {
        return <h1>Ошибка в данных</h1>;
    } else if (!items) {
        return <h1>Нет данных</h1>;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSelectCategory = (category) => {
        if (category === "All") {
            setCurrentCategoies();
        } else {
            setCurrentCategoies(category);
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

    const categoiesReverse = [...categories].reverse();

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
        <>
            {isLoading ? (
                <div className={styles.view}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.catalog}>
                    <FilterByCategory
                        currentCategories={currentCategories}
                        categories={categoiesReverse}
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
            )}
        </>
    );
};

export default Catalog;
