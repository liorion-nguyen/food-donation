import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
    name: 'Loading',
    initialState: {
        mode: false,
    },
    reducers: {
        showLoading(state) {
            return {
                ...state,
                mode: true,
            }
        },
        hideLoading(state) {
            return {
                ...state,
                mode: false,
            }
        },
    }
})

export const LoadingActions = LoadingSlice.actions;
export default LoadingSlice.reducer;