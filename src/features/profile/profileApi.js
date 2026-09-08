import { ecommerceApi } from "../../services/ecommerceApi";

export const profileApi = ecommerceApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query: () => `user/profile`,
            providesTags: (result) => 
                result ?
                [{ type: 'User', id: result[0].id }]
                :
                [{ type: 'User', id: 'PROFILE' }],

        }),
        getAddresses: build.query({
            query: () => `user/addresses`,
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({
                            type: "Address",
                            id,
                        })),
                        { type: "Address", id: "LIST" },
                    ]
                :   [{ type: "Address", id: "LIST" }],
        }),
        getAddress: build.query({
            query: (id) => `user/addresses/${id}`,
            providesTags: (result, error, id) => [{ type: "Address", id }],
        }),
        addAddress: build.mutation({
            query: (body) => ({
                    url: `user/addresses`,
                    method: "POST",
                    body,
                }),
            invalidatesTags: [{ type: "Address", id: "LIST" }],
        }),
        updateAddress: build.mutation({
            query: (data) => {
                const { id, ...body } = data;
                return {
                    url: `user/addresses/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: (result, error, { id }) => [
                { type: "Address", id },
            ],
        }),
        deleteAddress: build.mutation({
            query: (id) => ({
                    url: `user/addresses/${id}`,
                    method: "DELETE",
                }),
            invalidatesTags: (result, error, id ) => [
                { type: "Address", id },
            ],
        }),
        logout: build.mutation({
            query: (id) => ({
                url: `auth/logout`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id: id }],
        })
    }),
});

export const {
    useGetProfileQuery,
    useGetAddressesQuery,
    useGetAddressQuery,
    useLazyGetAddressQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useLogoutMutation
} = profileApi;
