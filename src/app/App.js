import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/MainPage/Main";
import Catalog from "./pages/Catalog/Catalog";
import PayAndDelivery from "./pages/PayAndDelivery/PayAndDelivery";
import Contacts from "./pages/Contacts/Contacts";
import LoginPage from "./pages/LoginPage/LoginPage";
import ShopingCart from "./pages/ShopingCart";
import Layouts from "./components/common/Layouts/Layouts";
import ItemPage from "./pages/ItemPage/ItemPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layouts />}>
                <Route index element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:id" element={<ItemPage />} />
                <Route path="/delivery" element={<PayAndDelivery />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/loginPage/:type?" element={<LoginPage />} />
                <Route path="/shopingCart" element={<ShopingCart />} />
                <Route path="*" element={<Main />} />
            </Route>
        </Routes>
    );
}

export default App;
