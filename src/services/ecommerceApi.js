import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import 'dotenv/config';


export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ['Address', 'Orders', 'Cart', 'Products', 'User'],
    endpoints: () => ({})
})