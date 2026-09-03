import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const ProductsPage = () => {
    return (
        <>  
            <Navbar/>
            <Outlet />
        </>
    );
};

export default ProductsPage;
