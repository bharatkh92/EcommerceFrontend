import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const OrdersPage = () => {
    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    );
};

export default OrdersPage;
