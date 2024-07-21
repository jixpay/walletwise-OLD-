import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

export type Store = {
    id: number,
    name: string,
    user_id: number,
    description: string,
    image: string
}

interface StoreState {
    stores: Store[] | []
    mystores: Store[] | []
    loading_stores: boolean
    loading_mystores: boolean
    loading_create: boolean
    loading_update: boolean
    loading_delete: boolean
}

const initialState = {
    stores:[],
    mystores:[],
    loading_mystores: false,
    loading_stores: false,
    loading_create: false,
    loading_update: false,
    loading_delete: false
}satisfies StoreState as StoreState

export const upload_store_image = createAsyncThunk('/upload_store_image', async (file:File) => {
    try {
        const data = new FormData()
        data.append('file', file)
        return (await AxiosInstance.post('/stores/mystores/upload', data)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const create_store = createAsyncThunk('/create_store', async (inputs:Object) => {
    try {
        return (await AxiosInstance.post('/stores/mystores', inputs)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_mystores = createAsyncThunk('/fetch_mystores', async () => {
    try {
        return (await AxiosInstance.get('/stores/mystores')).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_stores = createAsyncThunk('/fetch_stores', async () => {
    try {
        return (await AxiosInstance.get('/stores')).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_store = createAsyncThunk('/fetch_store', async (id: number) => {
    try {
        return (await AxiosInstance.get(`/stores/mystores/${id}`)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const update_store = createAsyncThunk('/update_store', async (inputs: any) => {
    try {
        return (await AxiosInstance.patch(`/stores/mystores/${inputs.id}`, inputs)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

export const delete_store = createAsyncThunk('/delete_store', async (id: number) => {
    try {
        return (await AxiosInstance.delete(`/stores/mystores/${id}`)).data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
})

const storeSlice = createSlice({
    name:'store',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(create_store.pending, (state) => {
            state.loading_create = true
        })
        builder.addCase(create_store.rejected, (state) => {
            state.loading_create = false
        })
        builder.addCase(create_store.fulfilled, (state, action) => {
            state.loading_create = false
            state.mystores = [...state.mystores, action.payload]
        })

        builder.addCase(fetch_mystores.pending, (state) => {
            state.loading_mystores = true
        })
        builder.addCase(fetch_mystores.rejected, (state) => {
            state.loading_mystores = false
        })
        builder.addCase(fetch_mystores.fulfilled, (state, action) => {
            state.loading_mystores = false
            state.mystores = action.payload
        })

        builder.addCase(fetch_stores.pending, (state) => {
            state.loading_stores = true
        })
        builder.addCase(fetch_stores.rejected, (state) => {
            state.loading_stores = false
        })
        builder.addCase(fetch_stores.fulfilled, (state, action) => {
            state.loading_stores = false
            state.stores = action.payload
        })

        builder.addCase(update_store.pending, (state) => {
            state.loading_update = true
        })
        builder.addCase(update_store.rejected, (state) => {
            state.loading_update = false
        })
        builder.addCase(update_store.fulfilled, (state,action) => {
            state.loading_update = false
            const index = state.mystores.findIndex(store => store.id === action.payload.id)
            if(index !== -1){
                state.mystores.splice(index, 1)
                state.mystores = [...state.mystores, action.payload]
            }
        })

        builder.addCase(delete_store.pending, (state) => {
            state.loading_delete = true
        })
        builder.addCase(delete_store.rejected, (state) => {
            state.loading_delete = false
        })
        builder.addCase(delete_store.fulfilled, (state, action) => {
            state.loading_delete = false
            const index = state.mystores.findIndex(store => store.id === action.payload.id)
            if(index !== -1){
                state.mystores.splice(index, 1)
                state.mystores = [...state.mystores, action.payload]
            }
        })
    }
})

export default storeSlice.reducer;
