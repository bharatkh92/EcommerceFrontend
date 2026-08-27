import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        id: null,
        name: null,
        email: null,
        createdAt: null
    },
    reducers: {

    }
})