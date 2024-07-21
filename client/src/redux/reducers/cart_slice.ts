import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

export type Cart = {
    id: number,
    name: string,
    user_id: number
}

interface CartState {
    carts:Cart[]|[]
    loading_carts: boolean
    loading_create: boolean
}

const initialState = {
    carts: [],
    loading_carts: false,
    loading_create: false
} satisfies CartState as CartState

export const calculate_total = createAsyncThunk('/calculate_total', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/orders/calculate_total/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_carts = createAsyncThunk('/fetch_carts', async () => {
    try {
        return (await AxiosInstance.get('/carts')).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_cart = createAsyncThunk('/fetch_cart', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/carts/${id}`)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const create_cart = createAsyncThunk('/create_cart', async (inputs: Object) => {
    try {
        return (await AxiosInstance.post('/carts', inputs)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const delete_cart = createAsyncThunk('/delete_cart', async (id: number) => {
    try {   
        return (await AxiosInstance.delete(`/carts/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const update_cart = createAsyncThunk('/update_cart', async (inputs: any) => {
    try {
        return (await AxiosInstance.patch(`/carts/${inputs.id}`, inputs)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetch_carts.pending, (state) => {
            state.loading_carts = true
        })
        builder.addCase(fetch_carts.rejected, (state) => {
            state.loading_carts = false
        })
        builder.addCase(fetch_carts.fulfilled, (state, action) => {
            state.loading_carts = false
            state.carts = action.payload
        })

        builder.addCase(create_cart.pending, (state) => {
            state.loading_create = true
        })
        builder.addCase(create_cart.rejected, (state) => {
            state.loading_create = false
        })
        builder.addCase(create_cart.fulfilled, (state, action) => {
            state.loading_create = false
            state.carts = [...state.carts, action.payload]
        })
    }
})

export default cartSlice.reducer