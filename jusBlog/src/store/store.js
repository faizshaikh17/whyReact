import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/authSlice'

const authReducer = authSlice.reducer;

const store = configureStore({
    reducer: authReducer
}
)

export default store;