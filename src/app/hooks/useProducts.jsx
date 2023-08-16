import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import productsService from "../services/http.service";
import { productsServiceFirebase } from "../services/Firebase.service";
import Loader from "../components/ui/Loader/Loader";
import { toast } from "react-toastify";

const ProductsContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchAllItems() {
        try {
            const data = await productsService.getAllProducts();
            setItems(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchAllCategories() {
        try {
            const data = await productsService.getCategories();
            setCategories([...data, ...["All"]]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function initializeFirebaseItems() {
        try {
            for (const item of items) {
                await productsServiceFirebase.update(item.id, item);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchAllCategories();
        fetchAllItems();
    }, []);

    useEffect(() => {
        initializeFirebaseItems();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <ProductsContext.Provider value={{ items, categories }}>
            {!isLoading ? (
                children
            ) : (
                <div style={{ width: 100, height: 900 }}>
                    <Loader />
                </div>
            )}
        </ProductsContext.Provider>
    );
};

ProductsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
