import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000`,
        credentials: 'include'
    }),
    tagTypes: ['Address', 'Orders', 'Cart', 'Products'],
    endpoints: () => ({})
})