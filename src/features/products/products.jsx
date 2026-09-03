import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "./productsApi";
import QueryStateHandler from "../../components/QueryStateHandler";
import Product from "../../components/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export const Products = () => {
    const [page, setPage] = useState(1);
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [categoryId, setCategoryId] = useState(null);
    const {
        data: productsData = [],
        error: getProductsError,
        isLoading: loadingProducts,
    } = useGetProductsQuery({ page, limit: 20, categoryId });
    const {
        data: categoriesData,
        error: categoriesError,
        isLoading: loadingCategories,
    } = useGetCategoriesQuery();
    const products = productsData?.products;
    const categories = categoriesData || [];
    // console.log(categories);
    const currentPage = productsData?.currentPage;
    const totalPages = productsData?.totalPages;
    // console.log(products);

    const handlePreviousClick = () => {
        setPage(page - 1);
    };

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const handleCategoryClick = () => {};
    const handleSideBarToggle = () =>
        sidebarToggle ? setSidebarToggle(false) : setSidebarToggle(true);

    return (
        <QueryStateHandler error={getProductsError} isLoading={loadingProducts}>
            <section className="flex flex-col text-sm sm:text-base">
                <div className="flex justify-around py-2">
                    <p>Categories</p>
                    {sidebarToggle ?
                        <FontAwesomeIcon
                            className="text-xl"
                            onClick={handleSideBarToggle}
                            icon={faCircleArrowLeft}
                        />
                    :   <FontAwesomeIcon
                            className="text-xl"
                            onClick={handleSideBarToggle}
                            icon={faCircleArrowRight}
                        />
                    }
                </div>
                <div className="flex">
                    <div
                        className={
                            sidebarToggle ?
                                "w-11/12 sm:w-1/4 fixed top-38 left-0 h-full sm:static pl-6 pt-1 pb-3 sm:pr-6 shadow-[10px_0px_20px_#000] overflow-y-auto bg-black"
                            :   "hidden"
                        }
                    >
                        {categories ?
                            <aside>
                                {categories.map((obj) => (
                                    <div className="py-1" key={obj.id}>
                                        <p>{obj.name}</p>
                                    </div>
                                ))}
                            </aside>
                        :   ""}
                    </div>
                    <div
                        className={
                            sidebarToggle ?
                                "w-full bg-green-500"
                            :   "w-full bg-pink-900"
                        }
                    >
                        <p className="bg-red-800">Products</p>
                        <div>
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
                                <div className="flex  bg-amber-300">
                                    {Number(currentPage) > 1 ?
                                        <div>
                                            <p onClick={handlePreviousClick}>
                                                Prev Page{" "}
                                                {Number(currentPage) - 1}
                                            </p>
                                        </div>
                                    :   ""}
                                    <div>
                                        <p>Current Page {currentPage}</p>
                                    </div>
                                    {Number(currentPage) < Number(totalPages) ?
                                        <div>
                                            <p onClick={handleNextClick}>
                                                Next Page{" "}
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
