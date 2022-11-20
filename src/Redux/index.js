import { configureStore } from "@reduxjs/toolkit";
import post from './PostSlice'
import user from './UserSlice'

const rootReducer = configureStore({
    reducer: {
        post,
        user
    }
})

export default rootReducer