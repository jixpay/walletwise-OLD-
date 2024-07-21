import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

export type Product = {
    id:number,
    store_id: number,
    name:string,
    description:string,
    price:number,
    category:string,
    stocks:number,
    image:string
}

interface ProductState {
    products: Product[] | []
    loading_products: boolean
    loading_create: boolean,
    search_query: string,
    category: string
}

const initialState = {
    products:[],
    loading_products: false,
    loading_create: false,
    search_query: '',
    category: ''
}satisfies ProductState as ProductState

export const upload_product_image = createAsyncThunk('/upload_product_image', async (file:File) => {
    try {
        const data = new FormData()
        data.append('file', file)
        return (await AxiosInstance.post('/products/upload', data)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const create_product = createAsyncThunk('/create_product', async (inputs:Object) => {
    try {
        return (await AxiosInstance.post('/products', inputs)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_products = createAsyncThunk('/fetch_products', async () => {
    try {
        return (await AxiosInstance.get(`/products`)).data 
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_product = createAsyncThunk('/fetch_product', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/products/${id}`)).data 
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_myproducts = createAsyncThunk('/fetch_myproducts/:id', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/products/store-products/${id}`)).data 
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const search_product = createAsyncThunk('/search_product', async (name: string) => {
    try {
        return (await AxiosInstance.get(`/products/search/${name}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const delete_product = createAsyncThunk('/delete_product', async (id: number) => {
    try {
        return (await AxiosInstance.delete(`/products/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const update_product = createAsyncThunk('/update_product', async (data: any) => {
    try {
        return (await AxiosInstance.patch(`/products/${data.id}`, data)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        set_search: (state, action: PayloadAction<string>) => {
            state.search_query = action.payload
        },
        set_category: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(create_product.pending, (state) => {
            state.loading_create = true
        })
        builder.addCase(create_product.rejected, (state) => {
            state.loading_create = false
        })
        builder.addCase(create_product.fulfilled, (state, action) => {
            state.loading_create = false
            state.products = [...state.products, action.payload]
        })

        builder.addCase(fetch_products.pending, (state) => {
            state.loading_products = true
        })
        builder.addCase(fetch_products.rejected, (state) => {
            state.loading_products = false
        })
        builder.addCase(fetch_products.fulfilled, (state, action) => {
            state.loading_products = false
            state.products = action.payload
        })

        builder.addCase(search_product.pending, (state) => {
            state.loading_products = true
        })
        builder.addCase(search_product.rejected, (state) => {
            state.loading_products = false
        })
        builder.addCase(search_product.fulfilled, (state, action) => {
            state.loading_products = false
            state.products = action.payload
        })
    }
})

export const {set_search, set_category} = productSlice.actions
export default productSlice.reducer
