import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const CartPage = () => {
    return (
        <>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </>
    );
};

export default CartPage;
