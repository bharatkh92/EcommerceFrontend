import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Profile from "./features/Profile/Profile.jsx";
import Addresses from "./features/Profile/Addresses.jsx";
import Products from "./features/Products/Products.jsx";
import CartPage from "./pages/CartPage.jsx";
import Cart from "./features/Cart/Cart.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import Orders from "./features/Orders/Orders.jsx";
import HomePage from "./pages/HomePage.jsx";
import OrderItems from "./features/Orders/OrderItems.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route index path="home" element={<HomePage/>} />
                    <Route path="products" element={<ProductsPage />}>
                        <Route index element={<Products />} />
                    </Route>
                    <Route path="user">
                        <Route path="profile" element={<ProfilePage />}>
                            <Route index element={<Profile />} />
                            <Route path="addresses" element={<Addresses />} />
                        </Route>
                        <Route path="cart" element={<CartPage />}>
                            <Route index element={<Cart />} />
                        </Route>
                        <Route path="orders" element={<OrdersPage />}>
                            <Route index element={<Orders/>} />
                            <Route path=":orderId" element={<OrderItems/>} />
                        </Route>
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
);
