import { ecommerceApi } from "../../services/ecommerceApi";

export const ordersApi = ecommerceApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => "orders",
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({
                            type: "Orders",
                            id,
                        })),
                        { type: "Orders", id: "LIST" },
                    ]
                :   [{ type: "Orders", id: "LIST" }],
        }),
        getOrder: build.query({
            query: (id) => `orders/${id}`,
            providesTags: (result, error, id) => [{ type: "Orders", id }],
        }),
        addOrder: build.mutation({
            query: (address_id) => ({
                url: `orders`,
                method: "POST",
                body: {
                    address_id,
                },
            }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }],
        }),
        deleteOrder: build.mutation({
            query: (order_id) => ({
                url: `orders/${order_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, order_id) => [{ type: 'Orders', id: order_id }]
        })
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useLazyGetOrdersQuery,
    useLazyGetOrderQuery,
    useAddOrderMutation,
    useDeleteOrderMutation
} = ordersApi;