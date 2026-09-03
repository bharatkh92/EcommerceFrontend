import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi } from "../services/ecommerceApi";

export const store = configureStore({
    reducer: {
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(ecommerceApi.middleware),
})