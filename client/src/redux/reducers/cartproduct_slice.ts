import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

interface CartProductState {
    loading_create: boolean
    loading_delete: boolean
}

export type CartProduct = {
    id: number,
    cart_id: number,
    product_id: number,
    quantity: number
}

const initialState = {
    loading_create: false,
    loading_delete: false
} satisfies CartProductState as CartProductState

export const fetch_cartproducts = createAsyncThunk('/fetch_cartproducts', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/cartproducts/cart/${id}`)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const create_cartproduct = createAsyncThunk('/create_cartproduct', async (inputs: Object) => {
    try {
        return (await AxiosInstance.post('/cartproducts', inputs)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const update_cartproduct = createAsyncThunk('/update_cartproduct', async (inputs: any) => {
    try {  
        const id = inputs.id
        delete inputs.id 
        return (await AxiosInstance.patch(`/cartproducts/${id}`, inputs)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const delete_cartproduct = createAsyncThunk('/delete_cartproduct', async (id: number) => {
    try {  
        return (await AxiosInstance.delete(`/cartproducts/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

const cartProductSlice = createSlice({
    name:'cartproduct',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(create_cartproduct.pending, (state) => {
            state.loading_create = true
        })
        builder.addCase(create_cartproduct.rejected, (state) => {
            state.loading_create = false
        })
        builder.addCase(create_cartproduct.fulfilled, (state) => {
            state.loading_create = false
        })

        builder.addCase(delete_cartproduct.pending, (state) => {
            state.loading_delete = true
        })
        builder.addCase(delete_cartproduct.rejected, (state) => {
            state.loading_delete = false
        })
        builder.addCase(delete_cartproduct.fulfilled, (state, action) => {
            state.loading_delete = false
        })
    }
})

export default cartProductSlice.reducer