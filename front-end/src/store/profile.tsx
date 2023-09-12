import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'prifile',
    initialState: 
        {
            province: {
                open: false,
                mode: ''
            },
        },
    reducers: {
        GetProvince(state, actions) {
            return {
                ...state,
                province: actions.payload,
            }
        },

    }
});
export const profileActions = profileSlice.actions;
export default profileSlice.reducer;