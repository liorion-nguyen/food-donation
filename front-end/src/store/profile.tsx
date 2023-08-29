import { createSlice } from "@reduxjs/toolkit";

const prifileSlice = createSlice({
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
        }

    }
});
export const prifileActions = prifileSlice.actions;
export default prifileSlice.reducer;