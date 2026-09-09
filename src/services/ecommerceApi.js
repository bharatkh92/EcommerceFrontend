import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const baseUrl = import.meta.env.VITE_BASE_URL;


export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: 'include'
    }),
    tagTypes: ['Address', 'Orders', 'Cart', 'Products', 'User'],
    endpoints: () => ({})
})