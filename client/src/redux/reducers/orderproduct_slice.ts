import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

export type OrderProduct = {
    id: number,
    product_id: number,
    order_id: number,
    quantity: number,
    store_id: number,
    status: string
}

interface OrderState {
}

const initialState = {
} satisfies OrderState as OrderState

export const fetch_orderproducts = createAsyncThunk('/fetch_orderproducts', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/orderproducts/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_storeorders = createAsyncThunk('fetch_storeorders', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/orderproducts/store/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const cancel_orderproduct = createAsyncThunk('cancel_orderproduct', async (id: number | null) => {
    try {
        return (await AxiosInstance.patch(`/orderproducts/cancel/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const ship_orderproduct = createAsyncThunk('ship_orderproduct', async (id: number | null) => {
    try {
        return (await AxiosInstance.patch(`/orderproducts/ship/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const receive_orderproduct = createAsyncThunk('receive_orderproduct', async (id: number | null) => {
    try {
        return (await AxiosInstance.patch(`/orderproducts/receive/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

const orderProductSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
    },
    extraReducers: builder => {}
})

export default orderProductSlice.reducer;
