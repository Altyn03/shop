import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./pages/MainPage/Main";
import Catalog from "./pages/Catalog/Catalog";
import PayAndDelivery from "./pages/PayAndDelivery/PayAndDelivery";
import Contacts from "./pages/Contacts/Contacts";
import LoginPage from "./pages/LoginPage/LoginPage";
import ShopCart from "./pages/ShopCart/ShopCart";
import Layouts from "./components/common/Layouts/Layouts";
import ItemPage from "./pages/ItemPage/ItemPage";
import { ProductsProvider } from "./hooks/useProducts";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LogOut from "./components/common/LogOut";
import { OrderProvider } from "./hooks/useOrder";

function App() {
    return (
        <AuthProvider>
            <ProductsProvider>
                <OrderProvider>
                    <Routes>
                        <Route path="/" element={<Layouts />}>
                            <Route index element={<Main />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:id" element={<ItemPage />} />
                            <Route
                                path="/delivery"
                                element={<PayAndDelivery />}
                            />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route
                                path="/loginPage/:type?"
                                element={<LoginPage />}
                            />
                            <Route path="/logOut" element={<LogOut />} />
                            <Route
                                path="/shopCart"
                                element={
                                    <ProtectedRoute element={<ShopCart />} />
                                }
                            />
                            <Route path="*" element={<Main />} />
                        </Route>
                    </Routes>
                </OrderProvider>
            </ProductsProvider>
        </AuthProvider>
    );
}

export default App;
