import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const CartPage = () => {
    return (
        <>
            <Navbar/>
            <div className="w-1/2 bg-cyan-500">
                <h1>This is a Cart Page Layout</h1>
                <Outlet/>
            </div>
        </>
    );
};

export default CartPage;
