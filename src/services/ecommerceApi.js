import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ['Address', 'Orders', 'Cart', 'Products', 'User'],
    endpoints: () => ({})
})