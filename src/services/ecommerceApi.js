import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ecommercerest.onrender.com/",
        credentials: 'include'
    }),
    tagTypes: ['Address', 'Orders', 'Cart', 'Products', 'User'],
    endpoints: () => ({})
})