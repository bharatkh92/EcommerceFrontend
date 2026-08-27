import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        
    })
})