import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

export type Order = {
    id: number,
    cart_id: number,
    user_id: number,
    message: string,
    mode_of_payment: string,
    destination: string,
    total: number,
}

interface OrderState {
    orders:Order[] | []
    loading_orders: boolean
}

const initialState = {
    orders:[],
    loading_orders:false,
} satisfies OrderState as OrderState

export const create_order = createAsyncThunk('/create_order', async (inputs: Object) => {
    try {
        return (await AxiosInstance.post('/orders', inputs)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_orders = createAsyncThunk('/fetch_orders', async () => {
    try {
        return (await AxiosInstance.get('/orders')).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_order = createAsyncThunk('/fetch_order', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/orders/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const delete_order = createAsyncThunk('/delete_order', async (id: number) => {
    try {
        return (await AxiosInstance.delete(`/orders/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetch_orders.pending, (state) => {
            state.loading_orders = true
        })
        builder.addCase(fetch_orders.rejected, (state) => {
            state.loading_orders = false
        })
        builder.addCase(fetch_orders.fulfilled, (state, action) => {
            state.loading_orders = false
            state.orders = action.payload
        })
    }
})

export default orderSlice.reducer;