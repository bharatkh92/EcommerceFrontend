import { ecommerceApi } from "../../services/ecommerceApi";

export const prodcutsApi = ecommerceApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ page = 1, limit = 21, categoryId = null }) => {
                if (categoryId) {
                    return `products?category=${categoryId}&limit=${limit}&page=${page}`;
                } else {
                    return `products?limit=${limit}&page=${page}`;
                }
            },
            providesTags: (result) => 
                result?.products ?
                [
                    ...result.products.map(({id}) => ({
                        type: 'Products',
                        id,
                    })),
                    { type: 'Products', id: 'LIST' }
                ] : 
                [{ type: 'Products', id: 'LIST' }]
        }),
        getProduct: build.query({
            query: (id) => `products/${id}`,
        }),
        getCategories: build.query({
            query: () => `products/categories`,
        }),
        // getCategoryProducts: build.query({
        //     query: ({ categoryId, page = 1, limit = 20 }) =>
        //         `products?limit${limit}&categoryId=${categoryId}&page=${page}`,
        // }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    // useGetCategoryProductsQuery,
    useLazyGetProductsQuery,
    useLazyGetProductQuery,
    useLazyGetCategoriesQuery,
    // useLazyGetCategoryProductsQuery,
} = prodcutsApi;