import { useEffect, useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "./productsApi";
import QueryStateHandler from "../../components/QueryStateHandler";
import Product from "../../components/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useGetCartQuery } from "../cart/cartApi";

export const Products = () => {
    const [page, setPage] = useState(1);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const {
        data: productsData = [],
        error: getProductsError,
        isLoading: loadingProducts,
    } = useGetProductsQuery({ page, limit: 21, categoryId });
    const {
        data: categoriesData,
        error: categoriesError,
        isLoading: loadingCategories,
    } = useGetCategoriesQuery();
    const {
        data: cartData,
        error: getCartError,
        isLoading: loadingCart,
    } = useGetCartQuery();
    const categories = categoriesData || [];
    const cart = cartData?.cart || [];
    const products = productsData?.products?.map((product) => {
        const cartItem = cart.find(
            (cartItem) => cartItem.id === product.id,
        );
        return {
            ...product,
            quantity: cartItem ? cartItem.quantity : 0,
        };
    });
    const currentPage = productsData?.currentPage;
    const totalPages = productsData?.totalPages;
    const handlePreviousClick = () => {
        setPage(page - 1);
    };

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const handleCategoryClick = (id) => {
        setCategoryId(id);
        setPage(1);
    };
    const handleSideBarToggle = () =>
        sidebarToggle ? setSidebarToggle(false) : setSidebarToggle(true);

    return (
        <QueryStateHandler error={getProductsError} isLoading={loadingProducts}>
            <section className="flex flex-col text-sm sm:text-base lg:text-xl">
                <div className="flex justify-between pl-3 sm:pl-5 py-1 sm:py-2 w-30 xl:w-74 lg:w-53 md:w-40 text-md sm:text-xl bg-black font-medium text-blue-200">
                    <p>Categories</p>
                    {sidebarToggle ?
                        <FontAwesomeIcon
                            className="text-xl sm:text-2xl"
                            onClick={handleSideBarToggle}
                            icon={faCircleArrowLeft}
                        />
                    :   <FontAwesomeIcon
                            className="text-xl sm:text-2xl"
                            onClick={handleSideBarToggle}
                            icon={faCircleArrowRight}
                        />
                    }
                </div>
                <div className="flex">
                    <div
                        className={
                            sidebarToggle ?
                                "w-11/12 sm:w-2/6 fixed sm:text-sm top-36 left-0 h-810 sm:static pl-6 pt-1 pb-3 sm:pr-6 shadow-[10px_10px_20px_#000] overflow-y-auto sm:overflow-x-clip bg-black"
                            :   "hidden"
                        }
                    >
                        {categories ?
                            <aside>
                                {categories.map((obj) => (
                                    <div
                                        className={
                                            categoryId === obj.id ?
                                                "bg-gray-900 rounded-sm px-2"
                                            :   ""
                                        }
                                        key={obj.id}
                                    >
                                        <p
                                            className="py-1"
                                            onClick={
                                                categoryId === obj.id ?
                                                    () =>
                                                        handleCategoryClick(
                                                            null,
                                                        )
                                                :   () =>
                                                        handleCategoryClick(
                                                            obj.id,
                                                        )
                                            }
                                        >
                                            {obj.name}
                                        </p>
                                    </div>
                                ))}
                            </aside>
                        :   ""}
                    </div>
                    <div>
                        <p className="text-center font-bold border-t bg-gray-950 border-white py-1 sm:py-3 ">
                            Products
                        </p>
                        <div className="grid grid-cols-3 gap-1 px-1 pt-1 bg-white">
                            {products ?
                                products.map((obj) => (
                                    <Product
                                        key={obj.id}
                                        product={obj}
                                    ></Product>
                                ))
                            :   ""}
                        </div>
                        <div>
                            {currentPage ?
                                <div className="flex justify-around items-center py-2">
                                    {Number(currentPage) > 1 ?
                                        <div className="bg-black px-2 pb-1 shadow-[1px_1px_3px_#fff] ">
                                            <p onClick={handlePreviousClick}>
                                                Prev {" "}
                                                {Number(currentPage) - 1}
                                            </p>
                                        </div>
                                    :   ""}
                                    <div className="bg-gray-800 px-2 pb-1 shadow-[0px_0px_1px_#fff]">
                                        <p>Current  {currentPage}</p>
                                    </div>
                                    {Number(currentPage) < Number(totalPages) ?
                                        <div className="bg-black px-2 pb-1 shadow-[1px_1px_3px_#fff]">
                                            <p onClick={handleNextClick}>
                                                Next {" "}
                                                {Number(currentPage) + 1}
                                            </p>
                                        </div>
                                    :   ""}
                                </div>
                            :   ""}
                        </div>
                    </div>
                </div>
            </section>
        </QueryStateHandler>
    );
};

export default Products;
