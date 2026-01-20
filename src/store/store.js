import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import groupReducer from './slices/groupSlice'
import postReducer from './slices/postSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        groups: groupReducer,
        posts: postReducer,
        ui: uiReducer
    }
})
