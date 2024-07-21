import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../api/myapi";

export type User = {
    id: number,
    fname: string,
    lname: string,
    username: string,
    password: string,
    image: string
}

interface AuthState {
    user:User|null
    loading_user: boolean
    loading_signup: boolean
    loading_signin: boolean
    loading_signout: boolean
}

const initialState = {
    user: null,
    loading_user: false,
    loading_signup: false,
    loading_signin: false,
    loading_signout: false
} satisfies AuthState as AuthState

export const signup = createAsyncThunk('/signup', async (inputs: Object) => {
    try {
        return (await AxiosInstance.post('/auth/signup', inputs)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const signin = createAsyncThunk('/signin', async (inputs: Object) => {
    try {
        return (await AxiosInstance.post('/auth/signin', inputs)).data
    } catch (error:any) {
        console.log(error)
        throw new Error(error.response.data.message)
    }
})

export const signout = createAsyncThunk('/signout', async () => {
    function loading(time: number){
        return new Promise(resole => setTimeout(resole, time))
    }
    try {
        localStorage.removeItem('token')
        loading(3000).then((res:any) => {
            return
        })
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const fetch_user = createAsyncThunk('/fetch_user', async () => {
    try {
        return (await AxiosInstance.get('/auth')).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

export const upload_user_image = createAsyncThunk('/upload_user_image', async (image:File) => {
    try {
        const data = new FormData()
        data.append('file', image)
        return (await AxiosInstance.post('/auth/upload', data)).data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(signup.pending, (state) => {
            state.loading_signup = true
        }),
        builder.addCase(signup.rejected, (state) => {
            state.loading_signup = false
        }),
        builder.addCase(signup.fulfilled, (state) => {
            state.loading_signup = false
        }),

        builder.addCase(signin.pending, (state) => {
            state.loading_signin = true
        }),
        builder.addCase(signin.rejected, (state) => {
            state.loading_signin = false
        }),
        builder.addCase(signin.fulfilled, (state, action) => {
            state.loading_signin = false
            localStorage.setItem('token',action.payload)
        }),

        builder.addCase(signout.pending, (state) => {
            state.loading_signout = true
        }),
        builder.addCase(signout.rejected, (state) => {
            state.loading_signout = false
        }),
        builder.addCase(signout.fulfilled, (state) => {
            state.loading_signout = false
            state.user = null
        }),

        builder.addCase(fetch_user.pending, (state) => {
            state.loading_user = true
        }),
        builder.addCase(fetch_user.rejected, (state) => {
            state.loading_user = false
        }),
        builder.addCase(fetch_user.fulfilled, (state, action) => {
            state.loading_user = false
            state.user = action.payload
        })
    }
})

export default authSlice.reducer;