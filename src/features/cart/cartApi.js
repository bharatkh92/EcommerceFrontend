import { ecommerceApi } from "../../services/ecommerceApi";

export const cartApi = ecommerceApi.injectEndpoints({
    endpoints: (build) => ({
        getCart: build.query({
            query: () => "cart",
            providesTags: (result) =>
                result ?
                    [
                        ...result.cart.map(({ id }) => ({
                            type: "Cart",
                            id,
                        })),
                        { type: "Cart", id: "LIST" },
                    ]
                :   [{ type: "Cart", id: "LIST" }],
        }),
        addToCart: build.mutation({
            query: ({ product_id, quantity }) => ({
                url: "cart",
                method: "POST",
                body: {
                    product_id,
                    quantity,
                },
            }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }, { type: 'Products', id: 'LIST' }],
        }),
        updateCart: build.mutation({
            query: ({ product_id, quantity }) => ({
                url: "cart",
                method: "PUT",
                body: {
                    product_id,
                    quantity,
                },
            }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }, { type: 'Products', id: 'LIST' }],
        }),
        deleteFromCart: build.mutation({
            query: (product_id) => ({
                url: `cart/${product_id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, product_id) => [
                { type: "Products", id: product_id },
                { type: "Cart", id: product_id },
                { type: "Products", id: "LIST" },
            ],
        }),
        deleteCart: build.mutation({
            query: () => ({ url: "cart", method: "DELETE" }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }, { type: 'Products', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCartQuery,
    useLazyGetCartQuery,
    useAddToCartMutation,
    useUpdateCartMutation,
    useDeleteFromCartMutation,
    useDeleteCartMutation,
} = cartApi;
