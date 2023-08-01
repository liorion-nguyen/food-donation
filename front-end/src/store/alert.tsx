import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: 'alert',
    initialState: 
        {
            color: false,
            open: false,
            contentAlert: "",
        },
    reducers: {
        showAlert(state) {
            return {
                ...state,
                open: true,
            }
        },
        hideAlert(state) {
            return {
                ...state,
                open: false,
            }
        },
        setContentAlert(state, action) {
            return {
                ...state,
                contentAlert: action.payload,
            }
        },
        setColorGreen(state) {
            return {
                ...state,
                color: true,
            }
        },
        setColorWrong(state) {
            return {
                ...state,
                color: false,
            }
        },
    }
});
export const alertActions = alertSlice.actions;
export default alertSlice.reducer;